import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { FadeUp } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    axios.get(`${API}/blog/${slug}`).then((r) => setPost(r.data)).catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center" data-testid="post-missing">
        <p className="font-serif text-4xl">This post has wandered off the field.</p>
        <Link to="/blog" className="btn-primary mt-8">Back to the blog</Link>
      </div>
    );
  }
  if (!post) {
    return <div className="mx-auto max-w-3xl px-5 py-32 text-umber" data-testid="post-loading">Loading…</div>;
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-16 sm:px-8" data-testid="blog-post-page">
      <FadeUp>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-copper transition-colors hover:text-copper-dark" data-testid="post-back-link">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
        <p className="eyebrow mt-10">{post.category}</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl" data-testid="post-title">
          {post.title}
        </h1>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-umber/60">
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.read_time}
        </p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-sm border border-clay">
          <img src={post.image} alt={post.title} className="w-full object-cover" data-testid="post-image" />
        </div>
      </FadeUp>
      <FadeUp delay={0.15}>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-umber" data-testid="post-content">
          {post.content.map((para, i) => (
            <p key={i} className={i === 0 ? "font-serif text-2xl leading-relaxed text-espresso" : ""}>
              {para}
            </p>
          ))}
        </div>
      </FadeUp>
    </article>
  );
}
