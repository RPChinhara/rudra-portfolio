import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BLOG_PASSWORD_HASH = "62d7c9e7dd5634792f7aec4279a96dc443d879d1a86f8122196454a33a8aefa7";

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function CursorGlow() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const isTouchDevice = window.matchMedia("(hover: none)").matches;
  useEffect(() => {
    if (isTouchDevice) return;
    const dot = dotRef.current; const halo = haloRef.current;
    document.body.style.cursor = "none";
    const move = (e) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; halo.style.left = e.clientX + "px"; halo.style.top = e.clientY + "px"; };
    const over = (e) => { if (e.target.closest("a, button, [role=button]")) { dot.style.transform = "translate(-50%,-50%) scale(1.8)"; halo.style.transform = "translate(-50%,-50%) scale(1.4)"; halo.style.opacity = "0.6"; } };
    const out = () => { dot.style.transform = "translate(-50%,-50%) scale(1)"; halo.style.transform = "translate(-50%,-50%) scale(1)"; halo.style.opacity = "0.35"; };
    window.addEventListener("mousemove", move); window.addEventListener("mouseover", over); window.addEventListener("mouseout", out);
    return () => { document.body.style.cursor = ""; window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, [isTouchDevice]);
  if (isTouchDevice) return null;
  return (<>
    <div ref={haloRef} style={{ position: "fixed", pointerEvents: "none", zIndex: 9997, width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(77,232,194,0.5)", transform: "translate(-50%,-50%)", transition: "left 0.1s ease, top 0.1s ease, transform 0.2s ease, opacity 0.2s ease", opacity: 0.35, boxShadow: "0 0 12px rgba(77,232,194,0.25)" }} />
    <div ref={dotRef} style={{ position: "fixed", pointerEvents: "none", zIndex: 9998, width: 6, height: 6, borderRadius: "50%", background: "#4de8c2", transform: "translate(-50%,-50%)", transition: "left 0.04s linear, top 0.04s linear, transform 0.2s ease", boxShadow: "0 0 8px 2px rgba(77,232,194,0.7), 0 0 20px 4px rgba(77,232,194,0.3)" }} />
  </>);
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

  const tag = { fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.06em", background: "rgba(77,232,194,0.08)", border: "1px solid rgba(77,232,194,0.2)", color: "#4de8c2", padding: "3px 10px", borderRadius: 3 };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(100,200,180,0.2)", borderRadius: 6, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#d8ede8", outline: "none", marginBottom: 12 };

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

  return (
    <div style={{ background: "#080c10", color: "#d8ede8", fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: rgba(77,232,194,0.3); border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
      `}</style>

      <CursorGlow />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(77,232,194,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(77,232,194,0.022) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(8,12,16,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(100,200,180,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4de8c2", textDecoration: "none" }}>RC</Link>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Link to="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b8f85", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#4de8c2"} onMouseLeave={e => e.currentTarget.style.color = "#6b8f85"}>
              ← PORTFOLIO
            </Link>
            {!authed ? (
              <button onClick={() => setShowLogin(v => !v)} style={{ background: "none", border: "1px solid rgba(100,200,180,0.2)", borderRadius: 4, padding: "4px 14px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b8f85", letterSpacing: "0.08em" }}>ADMIN</button>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setWriting(v => !v)} style={{ background: writing ? "rgba(77,232,194,0.12)" : "none", border: "1px solid rgba(77,232,194,0.3)", borderRadius: 4, padding: "4px 14px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.08em" }}>{writing ? "CANCEL" : "+ NEW POST"}</button>
                <button onClick={() => { setAuthed(false); setWriting(false); }} style={{ background: "none", border: "1px solid rgba(100,200,180,0.1)", borderRadius: 4, padding: "4px 14px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#5a7a72", letterSpacing: "0.08em" }}>LOGOUT</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 32px 80px", position: "relative", zIndex: 1 }}>

        {/* Page header */}
        <div style={{ marginBottom: 56, animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4de8c2", marginBottom: 12 }}>Thoughts & Notes</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>Blog</h1>
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(77,232,194,0.4), transparent)" }} />
        </div>

        {/* Login panel */}
        {showLogin && (
          <div style={{ background: "#0d1318", border: "1px solid rgba(77,232,194,0.2)", borderRadius: 8, padding: 24, marginBottom: 40, maxWidth: 360, animation: "fadeUp 0.3s ease both" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 14 }}>Admin Login</div>
            <input type="password" value={pwInput} onChange={e => { setPwInput(e.target.value); setPwError(false); }} onKeyDown={e => e.key === "Enter" && login()} placeholder="Password" style={inputStyle} />
            {pwError && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#f87171", marginBottom: 10 }}>Incorrect password</div>}
            <button onClick={login} style={{ background: "#4de8c2", border: "none", borderRadius: 4, padding: "8px 20px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#080c10", letterSpacing: "0.08em", fontWeight: 700 }}>LOGIN</button>
          </div>
        )}

        {/* Write form */}
        {writing && (
          <div style={{ background: "#0d1318", border: "1px solid rgba(77,232,194,0.2)", borderRadius: 8, padding: 28, marginBottom: 48, animation: "fadeUp 0.3s ease both" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", marginBottom: 20 }}>New Post</div>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" style={inputStyle} />
            <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Write your thoughts..." rows={10} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.75 }} />
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags: ML, Research, IIT Bombay" style={inputStyle} />
            <button onClick={publish} style={{ background: "#4de8c2", border: "none", borderRadius: 4, padding: "9px 24px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#080c10", letterSpacing: "0.08em", fontWeight: 700 }}>PUBLISH</button>
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#3a5a52", lineHeight: 2 }}>
            No posts yet.<br />Click ADMIN in the nav to log in and write your first post.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {posts.map((p, idx) => (
              <article key={p.id} style={{ borderBottom: "1px solid rgba(100,200,180,0.08)", paddingBottom: 32, animation: `fadeUp 0.5s ease ${idx * 0.08}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1.25 }}>{p.title}</h2>
                  {authed && (
                    <button onClick={() => { save(posts.filter(x => x.id !== p.id)); if (expanded === p.id) setExpanded(null); }}
                      style={{ background: "none", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 3, padding: "3px 10px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#f87171", letterSpacing: "0.06em", whiteSpace: "nowrap", flexShrink: 0 }}>
                      DELETE
                    </button>
                  )}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.06em", marginBottom: 16 }}>{p.date}</div>
                <p style={{ fontSize: 15, color: "#8aada6", lineHeight: 1.85, whiteSpace: "pre-wrap", display: expanded === p.id ? "block" : "-webkit-box", WebkitLineClamp: expanded === p.id ? "unset" : 5, WebkitBoxOrient: "vertical", overflow: expanded === p.id ? "visible" : "hidden", marginBottom: 16 }}>
                  {p.body}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4de8c2", letterSpacing: "0.06em", padding: 0 }}>
                    {expanded === p.id ? "READ LESS ↑" : "READ MORE ↓"}
                  </button>
                  {p.tags?.length > 0 && p.tags.map(t => <span key={t} style={tag}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(100,200,180,0.1)", padding: "24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#5a7a72", letterSpacing: "0.07em" }}>Rudrapratap Chinhara · M.S. Researcher · Koita Centre for Digital Health · IIT Bombay</span>
        </div>
      </footer>
    </div>
  );
}