from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Emergent managed email proxy. Constant — never from env.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

# ---- Email guardrail gate (G2 + G3 structural checks) ----
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")

async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code})")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")

# ---- Models ----
class ContactIn(BaseModel):
    name: str
    email: EmailStr
    topic: str = "A message for the author"
    message: str
    allow_publish: bool = False

class SubscribeIn(BaseModel):
    email: EmailStr

class ReviewIn(BaseModel):
    name: str
    location: Optional[str] = ""
    quote: str

# ---- Routes ----
@api_router.get("/")
async def root():
    return {"message": "Believe Joanie Believe API"}

@api_router.post("/contact")
async def create_message(input: ContactIn):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.messages.insert_one(doc)
    email_sent = False
    if OWNER_EMAIL:
        subject = f"New reader message: {input.topic}"
        html = (
            '<table role="presentation" width="100%"><tr><td style="padding:24px;'
            'font-family:Arial,sans-serif;color:#1F1A17">'
            f'<h2 style="margin:0 0 12px">New message from a reader</h2>'
            f'<p style="margin:0 0 4px"><strong>Name:</strong> {escape(input.name)}</p>'
            f'<p style="margin:0 0 4px"><strong>Email:</strong> {escape(input.email)}</p>'
            f'<p style="margin:0 0 4px"><strong>Topic:</strong> {escape(input.topic)}</p>'
            f'<p style="margin:0 0 4px"><strong>Permission to publish:</strong> {"Yes" if input.allow_publish else "No"}</p>'
            f'<p style="margin:16px 0 4px"><strong>Message:</strong></p>'
            f'<p style="margin:0;white-space:pre-wrap">{escape(input.message)}</p>'
            f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by the {escape(EMAIL_FROM_NAME)} website.</p>'
            '</td></tr></table>'
        )
        try:
            email_sent = bool(await send_email(to=OWNER_EMAIL, subject=subject, html=html))
        except HTTPException:
            logger.warning("Owner notification email could not be sent; message stored.")
    return {"status": "ok", "email_sent": email_sent}

@api_router.post("/subscribe")
async def subscribe(input: SubscribeIn):
    await db.subscribers.update_one(
        {"email": input.email},
        {"$setOnInsert": {"id": str(uuid.uuid4()), "email": input.email,
                          "created_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"status": "ok"}

@api_router.get("/blog")
async def list_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("date", -1).to_list(100)
    return posts

@api_router.get("/blog/{slug}")
async def get_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@api_router.get("/reviews")
async def list_reviews():
    reviews = await db.reviews.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return reviews

@api_router.post("/reviews")
async def submit_review(input: ReviewIn):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["featured"] = False
    doc["published"] = False
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.reviews.insert_one(doc)
    return {"status": "ok"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

BLOG_SEED = [
    {
        "slug": "why-i-wrote-joanie",
        "title": "Why I Wrote Joanie",
        "category": "Behind the Book",
        "excerpt": "Every story begins somewhere. Mine began on a stoop in Millstone, with a girl who refused to put the bat down.",
        "image": "/illustrations/ch01.jpg",
        "date": "2026-07-01",
        "read_time": "4 min read",
        "content": [
            "Every story begins somewhere. Mine began on a stoop in Millstone, with a chalk-drawn strike zone and a girl who refused to put the bat down.",
            "Joanie came to me the way the best characters do — uninvited, insistent, and utterly convinced that the game was not over. I wrote her for the kid I was, for the kids I raised, and for anyone who has ever stood at the plate with the count against them.",
            "This book took years. Some chapters were joy to write; others I had to walk away from and come back to. But Joanie never let me quit on her. That, I think, is the whole point of the story: belief is not a feeling. It is a practice.",
            "Thank you for being here at the beginning of her journey into the world.",
        ],
    },
    {
        "slug": "the-streets-of-millstone",
        "title": "The Streets of Millstone",
        "category": "Personal Stories & Reflections",
        "excerpt": "Millstone is fictional, but it is built from every small town that ever raised somebody — the Gazette, the ballfield, the people who show up.",
        "image": "/illustrations/ch23.jpg",
        "date": "2026-06-18",
        "read_time": "5 min read",
        "content": [
            "Millstone is fictional, but it is built from every small town that ever raised somebody. The Gazette with its stubborn printing press. The ballfield with the lights that hum. The neighbors who know your business before you do — and bring casseroles anyway.",
            "When I drew the town, I kept thinking about the places that hold us: not because they are perfect, but because they are ours. Joanie's story needed a town that could break her heart and put it back together.",
            "If you grew up somewhere that felt too small for your dreams, this book is a love letter to you. Sometimes the smallest places produce the most stubborn believers.",
        ],
    },
    {
        "slug": "believing-is-a-verb",
        "title": "Believing Is a Verb",
        "category": "Inspiration & Encouragement",
        "excerpt": "Belief is not a mood that arrives on its own. It is a decision you make on the days when nothing in the box score agrees with you.",
        "image": "/illustrations/ch39.jpg",
        "date": "2026-06-02",
        "read_time": "3 min read",
        "content": [
            "People talk about belief as if it is a mood — something that arrives on its own, like weather. Joanie taught me otherwise. Belief is a verb. It is a decision you make on the days when nothing in the box score agrees with you.",
            "In Chapter 39, the whole town is watching, and Joanie has every reason to fold. What carries her is not confidence. It is the thousand small mornings she chose to swing anyway.",
            "Whatever your field is — whatever your game is — I hope you swing anyway. That is all believing ever was.",
        ],
    },
]

REVIEW_SEED = [
    {"name": "Rachel M.", "location": "Columbus, Ohio", "featured": True,
     "quote": "I finished it in two nights and then started again. Joanie is the character I needed when I was twelve — and apparently still need at forty."},
    {"name": "Daniel K.", "location": "Milltown, New Jersey", "featured": True,
     "quote": "The illustrations stopped me cold. You don't just read this book, you sit inside it. My daughter and I read a chapter aloud every night."},
    {"name": "Priya S.", "location": "Austin, Texas", "featured": False,
     "quote": "A story about grief that somehow leaves you lighter. Chapter 37 undid me — and Chapter 39 put me back together."},
    {"name": "Tom W.", "location": "Portland, Maine", "featured": False,
     "quote": "I bought it for the baseball. I stayed for the family. Believe Joanie Believe is about the long game, in every sense."},
]

@app.on_event("startup")
async def seed_content():
    if await db.blog_posts.count_documents({}) == 0:
        now = datetime.now(timezone.utc).isoformat()
        for p in BLOG_SEED:
            p["id"] = str(uuid.uuid4())
            p["created_at"] = now
        await db.blog_posts.insert_many(BLOG_SEED)
    if await db.reviews.count_documents({}) == 0:
        for r in REVIEW_SEED:
            r["id"] = str(uuid.uuid4())
            r["published"] = True
            r["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.reviews.insert_many(REVIEW_SEED)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
