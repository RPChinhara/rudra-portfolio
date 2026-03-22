import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

const BLOG_PASSWORD_HASH = "62d7c9e7dd5634792f7aec4279a96dc443d879d1a86f8122196454a33a8aefa7";
const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return DATE_FORMATTER.format(date);
}

function shouldClamp(body) {
  return body.length > 480 || body.split("\n").length > 6;
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [writing, setWriting] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", tags: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", body: "", tags: "" });

  useEffect(() => {
    let alive = true;

    async function loadPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && alive) {
        setPosts(data || []);
      }

      if (alive) {
        setLoading(false);
      }
    }

    loadPosts();

    return () => {
      alive = false;
    };
  }, []);

  const publish = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: form.title,
          body: form.body,
          tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        },
      ])
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    setPosts((current) => [data[0], ...current]);
    setForm({ title: "", body: "", tags: "" });
    setWriting(false);
  };

  const startEdit = (post) => {
    setWriting(false);
    setEditingId(post.id);
    setEditForm({
      title: post.title || "",
      body: post.body || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", body: "", tags: "" });
  };

  const saveEdit = async (id) => {
    if (!editForm.title.trim() || !editForm.body.trim()) {
      return;
    }

    const payload = {
      title: editForm.title,
      body: editForm.body,
      tags: editForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    const { data, error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.[0]) {
      setPosts((current) => current.map((post) => (post.id === id ? data[0] : post)));
    }

    cancelEdit();
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== id));
  };

  const login = async () => {
    const hash = await hashPassword(pwInput);
    if (hash === BLOG_PASSWORD_HASH) {
      setAuthed(true);
      setShowLogin(false);
      setPwError(false);
      setPwInput("");
      return;
    }

    setPwError(true);
  };

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
          <p className="academic-kicker">Notes and Writing</p>
          <h1>Blog</h1>
          <p className="academic-role" style={{ textAlign: "justify" }}>
            I write about my research, thoughts on machine learning and systems, and occasionally share updates about my work. This is also where I post drafts of my papers and projects for early feedback, so stay tuned!
          </p>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Navigation</p>
            <div className="academic-contact-list">
              <Link to="/">Return to profile</Link>
              <a href="#blog-posts">Jump to posts</a>
            </div>
          </div>

          <div className="academic-side-block">
            <p className="academic-mini-heading">Admin</p>
            <div className="academic-inline-actions">
              {!authed ? (
                <button
                  type="button"
                  className="academic-button-link academic-button-reset"
                  onClick={() => setShowLogin((value) => !value)}
                >
                  {showLogin ? "Hide login" : "Admin login"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="academic-button-link academic-button-reset"
                    onClick={() => setWriting((value) => !value)}
                  >
                    {writing ? "Cancel draft" : "Write new post"}
                  </button>
                  <button
                    type="button"
                    className="academic-text-button academic-button-reset academic-text-button--muted"
                    onClick={() => {
                      setAuthed(false);
                      setWriting(false);
                      cancelEdit();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>

        <main className="academic-content">
          {showLogin ? (
            <section className="academic-panel">
              <div className="academic-section__header">
                <h2>Admin Login</h2>
              </div>
              <input
                type="password"
                value={pwInput}
                onChange={(event) => {
                  setPwInput(event.target.value);
                  setPwError(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    login();
                  }
                }}
                placeholder="Password"
                className="academic-input"
              />
              {pwError ? <p className="academic-error">Incorrect password.</p> : null}
              <button type="button" className="academic-button-link academic-button-reset" onClick={login}>
                Log in
              </button>
            </section>
          ) : null}

          {writing ? (
            <section className="academic-panel">
              <div className="academic-section__header">
                <h2>New Post</h2>
              </div>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Title"
                className="academic-input"
              />
              <textarea
                value={form.body}
                onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                placeholder="Write your thoughts..."
                rows={10}
                className="academic-input academic-textarea"
              />
              <input
                value={form.tags}
                onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                placeholder="Tags: ML, Research, Systems"
                className="academic-input"
              />
              <button type="button" className="academic-button-link academic-button-reset" onClick={publish}>
                Publish post
              </button>
            </section>
          ) : null}

          <section id="blog-posts" className="academic-section">
            <div className="academic-section__header academic-section__header--row">
              <h2>Posts</h2>
              <p className="academic-small">
                {loading ? "Loading..." : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
              </p>
            </div>

            {loading ? (
              <p className="academic-muted">Loading posts...</p>
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
                        <p className="academic-record__meta">{formatDate(post.created_at)}</p>
                      </div>
                      {authed ? (
                        <button
                          type="button"
                          className="academic-text-button academic-button-reset academic-text-button--danger"
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>

                    {editingId === post.id ? (
                      <div className="academic-panel academic-panel--nested">
                        <input
                          value={editForm.title}
                          onChange={(event) =>
                            setEditForm((current) => ({ ...current, title: event.target.value }))
                          }
                          placeholder="Title"
                          className="academic-input"
                        />
                        <textarea
                          value={editForm.body}
                          onChange={(event) =>
                            setEditForm((current) => ({ ...current, body: event.target.value }))
                          }
                          placeholder="Edit post..."
                          rows={10}
                          className="academic-input academic-textarea"
                        />
                        <input
                          value={editForm.tags}
                          onChange={(event) =>
                            setEditForm((current) => ({ ...current, tags: event.target.value }))
                          }
                          placeholder="Tags (comma separated)"
                          className="academic-input"
                        />
                        <div className="academic-inline-actions">
                          <button
                            type="button"
                            className="academic-button-link academic-button-reset"
                            onClick={() => saveEdit(post.id)}
                          >
                            Save changes
                          </button>
                          <button
                            type="button"
                            className="academic-text-button academic-button-reset academic-text-button--muted"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
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
                            className="academic-button-link academic-button-reset"
                            onClick={() => setExpanded(isExpanded ? null : post.id)}
                          >
                            {isExpanded ? "Show less" : "Read more"}
                          </button>
                        ) : null}
                      </>
                    )}

                    {authed && editingId !== post.id ? (
                      <div className="academic-inline-actions academic-inline-actions--after">
                        <button
                          type="button"
                          className="academic-text-button academic-button-reset"
                          onClick={() => startEdit(post)}
                        >
                          Edit
                        </button>
                      </div>
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
