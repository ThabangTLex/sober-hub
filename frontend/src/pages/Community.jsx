import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const load = async () => {
        try {
            const res = await fetch('/api/community', { headers: authHeaders() });
            if (res.ok) setPosts(await res.json());
        } catch (_) {}
    };

    useEffect(() => { load(); }, []);

    const share = async () => {
        if (!content.trim()) return;
        setLoading(true);
        try {
            await fetch('/api/community', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ content }) });
            setContent('');
            load();
        } catch (_) {}
        setLoading(false);
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">COMMUNITY</span>
                <h1>You are part of a community.</h1>
                <p className="page-intro">A positive space for connection, encouragement and productive engagement.</p>

                <section className="dashcard" style={{ marginBottom: 18 }}>
                    <h3>Share with the community</h3>
                    <textarea rows={3} value={content} onChange={e => setContent(e.target.value)} placeholder="Share an encouraging message..." style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 10, padding: 10, marginTop: 8, outline: 'none' }} />
                    <button className="btn primary" style={{ marginTop: 12 }} onClick={share} disabled={loading}>
                        {loading ? 'Sharing...' : 'Share Post'}
                    </button>
                </section>

                <section className="dashcard">
                    <h3>Community posts</h3>
                    {posts.length === 0
                        ? <p className="muted">No posts yet. Be the first to share!</p>
                        : posts.map(p => (
                            <div key={p.id} className="post">
                                <b>{p.user?.firstName} {p.user?.lastName}</b>
                                <small className="muted"> • {new Date(p.createdAt).toLocaleString()}</small>
                                <p>{p.content}</p>
                            </div>
                        ))
                    }
                </section>

                <section className="dashcard" style={{ marginTop: 18 }}>
                    <h3>Community activities</h3>
                    <p className="muted" style={{ marginBottom: 8 }}>🎮 <b>Gaming</b> — Positive recreation and connection</p>
                    <p className="muted" style={{ marginBottom: 8 }}>🤝 <b>Peer support</b> — Daily support groups</p>
                    <p className="muted">🎓 <b>Skills learning</b> — Build practical and employable skills</p>
                </section>
            </main>
        </>
    );
}
