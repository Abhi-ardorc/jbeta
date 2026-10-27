import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MaskedLines, FadeUp } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blog`).then((r) => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div data-testid="blog-page">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="blog-kicker">The Blog</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>Notes from</>, <><em className="italic text-copper">Millstone</em></>]} />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-umber">
          Behind-the-book stories, personal reflections, encouragement, and every
          announcement worth making.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <FadeUp className="flex flex-wrap gap-3" data-testid="blog-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-testid={`filter-${c.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                active === c
                  ? "border-espresso bg-espresso text-linen"
                  : "border-clay text-umber hover:border-espresso hover:text-espresso"
              }`}
            >
              {c}
            </button>
          ))}
        </FadeUp>

        {loading ? (
          <p className="mt-16 text-umber" data-testid="blog-loading">Loading posts…</p>
        ) : (
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3" data-testid="blog-grid">
            {visible.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.1}>
                <Link to={`/blog/${p.slug}`} className="group block" data-testid={`blog-card-${p.slug}`}>
                  <div className="overflow-hidden rounded-sm border border-clay">
                    <img src={p.image} alt={p.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="eyebrow">{p.category}</span>
                    <span className="text-xs text-umber/60">{p.read_time}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-3xl leading-snug text-espresso transition-colors group-hover:text-copper">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-umber">{p.excerpt}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/60">
                    {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
