import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BLOG_PASSWORD_HASH = "62d7c9e7dd5634792f7aec4279a96dc443d879d1a86f8122196454a33a8aefa7"; // replace with your hash

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function BlogPage() {
  const [posts, setPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rc_blog_posts") || "[]"); } catch { return []; }
  });
  const [authed, setAuthed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [writing, setWriting] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", tags: "" });

  useEffect(() => { document.body.style.background = "#1e1e1e"; }, []);

  const save = (updated) => { setPosts(updated); localStorage.setItem("rc_blog_posts", JSON.stringify(updated)); };

  const publish = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const post = { id: Date.now(), title: form.title.trim(), body: form.body.trim(), tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) };
    save([post, ...posts]);
    setForm({ title: "", body: "", tags: "" });
    setWriting(false);
  };

  const login = async () => {
    const hash = await hashPassword(pwInput);
    if (hash === BLOG_PASSWORD_HASH) { setAuthed(true); setShowLogin(false); setPwError(false); setPwInput(""); }
    else setPwError(true);
  };

  const inputStyle = { width: "100%", background: "#2a2a2a", border: "1px solid #3a3a3a", borderRadius: 3, padding: "8px 10px", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#d4d4d4", outline: "none", marginBottom: 10 };
  const btnStyle = { fontFamily: "Inter, sans-serif", fontSize: 14, color: "#7cb8e8", background: "none", border: "none", cursor: "pointer", padding: 0 };

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1e1e1e; color: #d4d4d4; font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.7; }
        a { color: #7cb8e8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        h1 { font-size: 22px; font-weight: 600; color: #f0f0f0; margin-bottom: 4px; }
        h2 { font-size: 18px; font-weight: 600; color: #f0f0f0; margin-bottom: 4px; }
        hr { border: none; border-top: 1px solid #333; margin: 20px 0; }
        .tag { display: inline-block; font-size: 11px; background: #2a2a2a; color: #888; border: 1px solid #3a3a3a; padding: 1px 7px; border-radius: 3px; margin: 3px 3px 0 0; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1>Rudrapratap Chinhara</h1>
        <div style={{ fontSize: 14, color: "#777", marginBottom: 14 }}>Blog</div>
        <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link to="/" style={{ fontSize: 14, color: "#888" }}>← home</Link>
          {!authed
            ? <button onClick={() => setShowLogin(v => !v)} style={btnStyle}>admin</button>
            : <>
                <button onClick={() => setWriting(v => !v)} style={btnStyle}>{writing ? "cancel" : "+ new post"}</button>
                <button onClick={() => { setAuthed(false); setWriting(false); }} style={{ ...btnStyle, color: "#666" }}>logout</button>
              </>
          }
        </nav>
      </div>

      <hr />

      {/* Login */}
      {showLogin && (
        <div style={{ marginBottom: 32, maxWidth: 300 }}>
          <input type="password" value={pwInput} onChange={e => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={e => e.key === "Enter" && login()} placeholder="Password" style={inputStyle} />
          {pwError && <div style={{ fontSize: 13, color: "#e07070", marginBottom: 8 }}>Incorrect password.</div>}
          <button onClick={login} style={btnStyle}>log in →</button>
        </div>
      )}

      {/* Write form */}
      {writing && (
        <div style={{ marginBottom: 40, borderLeft: "2px solid #333", paddingLeft: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d4", marginBottom: 14 }}>New Post</div>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" style={inputStyle} />
          <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Write your thoughts..." rows={10} style={{ ...inputStyle, resize: "vertical" }} />
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags: ML, Research (comma separated)" style={inputStyle} />
          <button onClick={publish} style={btnStyle}>publish →</button>
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <p style={{ color: "#555", fontSize: 14 }}>No posts yet.</p>
      ) : (
        posts.map(p => (
          <div key={p.id} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <h2>{p.title}</h2>
              {authed && <button onClick={() => save(posts.filter(x => x.id !== p.id))} style={{ ...btnStyle, color: "#e07070", fontSize: 13, flexShrink: 0 }}>delete</button>}
            </div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>{p.date}</div>
            <p style={{ color: "#b0b0b0", whiteSpace: "pre-wrap", display: expanded === p.id ? "block" : "-webkit-box", WebkitLineClamp: expanded === p.id ? "unset" : 6, WebkitBoxOrient: "vertical", overflow: expanded === p.id ? "visible" : "hidden", marginBottom: 10 }}>{p.body}</p>
            <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={btnStyle}>{expanded === p.id ? "show less" : "read more"}</button>
            {p.tags?.length > 0 && <div style={{ marginTop: 8 }}>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
            <hr style={{ marginTop: 24 }} />
          </div>
        ))
      )}

      {/* Footer */}
      <div style={{ marginTop: 40, fontSize: 13, color: "#555", borderTop: "1px solid #333", paddingTop: 18 }}>
        Rudrapratap Chinhara · M.S. Researcher · Koita Centre for Digital Health · IIT Bombay
      </div>
    </div>
  );
}