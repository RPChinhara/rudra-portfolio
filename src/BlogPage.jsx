import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BLOG_POSTS_URL = "/blog-posts.json";

function shouldClamp(body) {
  return body.length > 480 || body.split("\n").length > 6;
}

function normalizePost(post, index) {
  return {
    id: `${typeof post?.title === "string" && post.title.trim() ? post.title.trim() : "post"}-${index}`,
    title: typeof post?.title === "string" && post.title.trim() ? post.title : "Untitled post",
    body: typeof post?.body === "string" ? post.body : "",
    tags: Array.isArray(post?.tags)
      ? post.tags
          .filter((tag) => typeof tag === "string" && tag.trim())
          .map((tag) => tag.trim())
      : [],
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    let alive = true;

    async function loadPosts() {
      try {
        const response = await fetch(BLOG_POSTS_URL, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Could not load ${BLOG_POSTS_URL}.`);
        }

        const payload = await response.json();
        const rawPosts = Array.isArray(payload) ? payload : payload?.posts;

        if (!Array.isArray(rawPosts)) {
          throw new Error("Blog JSON must be an array or an object with a posts array.");
        }

        if (alive) {
          setPosts(rawPosts.map(normalizePost));
          setError("");
        }
      } catch (loadError) {
        if (alive) {
          setError(loadError instanceof Error ? loadError.message : "Could not load blog posts.");
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="academic-site">
      <header className="academic-topbar">
        <div className="academic-topbar__inner">
          <Link to="/" className="academic-brand">
            Rudrapratap Chinhara
          </Link>
          <nav className="academic-nav" aria-label="Blog">
            <Link to="/">Profile</Link>
            <a href="#blog-posts">Posts</a>
          </nav>
        </div>
      </header>

      <div className="academic-shell academic-shell--blog">
        <aside className="academic-aside academic-aside--blog">
          <h1>Blog</h1>
          <p className="academic-role" style={{ textAlign: "justify" }}>
            I write about my research and occasionally share updates about my work. This is also where I post drafts of my papers and projects for early feedback, so stay tuned!
          </p>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Navigation</p>
            <div className="academic-contact-list">
              <Link to="/">Return to Profile</Link>
              <a href="#blog-posts">Return to Top</a>
            </div>
          </div>
        </aside>

        <main className="academic-content">
          <section id="blog-posts" className="academic-section">
            <div className="academic-section__header">
              <h2>Posts</h2>
            </div>

            {loading ? (
              <p className="academic-muted">Loading posts...</p>
            ) : error ? (
              <div className="academic-callout">
                <p>{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="academic-callout">
                <p>No posts yet.</p>
              </div>
            ) : (
              posts.map((post) => {
                const clamped = shouldClamp(post.body || "");
                const isExpanded = expanded === post.id;

                return (
                  <article key={post.id} className="academic-post">
                    <div className="academic-post__head">
                      <div>
                        <h3>{post.title}</h3>
                      </div>
                    </div>

                    <p
                      className={`academic-post__body ${
                        clamped && !isExpanded ? "academic-post__body--clamped" : ""
                      }`}
                    >
                      {post.body}
                    </p>
                    {clamped ? (
                      <button
                        type="button"
                        className="academic-inline-link academic-button-reset"
                        onClick={() => setExpanded(isExpanded ? null : post.id)}
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    ) : null}

                    {post.tags?.length ? (
                      <div className="academic-tag-list">
                        {post.tags.map((tag) => (
                          <span key={tag} className="academic-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })
            )}
          </section>

          <footer className="academic-footer">
            Rudrapratap Chinhara · M.S. by Research Student · Koita Centre for Digital Health · IIT Bombay
          </footer>
        </main>
      </div>
    </div>
  );
}
