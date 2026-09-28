import { useState, useEffect, useRef } from 'react';
import AppHeader from '../components/AppHeader';

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

const INITIAL_MESSAGES = [
    { from: 'mentor', text: 'Hi 👋 I\'m here to support you. How are you doing today?' },
    { from: 'user', text: 'I\'m working through my check-in and trying to stay productive.' },
    { from: 'mentor', text: 'That\'s a positive step. You can use the Skills Hub or talk to your support network whenever you need connection.' },
];

export default function Mentor() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [requests, setRequests] = useState([]);
    const [mentorMsg, setMentorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);

    const load = async () => {
        try {
            const res = await fetch('/api/mentor', { headers: authHeaders() });
            if (res.ok) setRequests(await res.json());
        } catch (_) {}
    };

    useEffect(() => { load(); }, []);
    useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { from: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'mentor', text: 'Thank you for reaching out. A mentor will respond to your request shortly.' }]);
        }, 600);
    };

    const sendRequest = async () => {
        if (!mentorMsg.trim()) return;
        setLoading(true);
        try {
            await fetch('/api/mentor', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ message: mentorMsg }) });
            setMentorMsg('');
            load();
        } catch (_) {}
        setLoading(false);
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">SOBER BUDDY</span>
                <h1>Mentor Support</h1>
                <p className="page-intro">Connect with recovery support.</p>

                <div className="chat" ref={chatRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`bubble${m.from === 'user' ? ' user' : ''}`}>{m.text}</div>
                    ))}
                </div>
                <div className="compose">
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..."
                        onKeyDown={e => e.key === 'Enter' && send()} />
                    <button className="btn primary" onClick={send}>Send</button>
                </div>

                <section className="dashcard" style={{ marginTop: 18 }}>
                    <h3>Request a mentor</h3>
                    <textarea rows={3} value={mentorMsg} onChange={e => setMentorMsg(e.target.value)}
                        placeholder="What would you like support with?"
                        style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 10, padding: 10, marginTop: 8, outline: 'none' }} />
                    <button className="btn primary" style={{ marginTop: 12 }} onClick={sendRequest} disabled={loading}>
                        {loading ? 'Sending...' : 'Send Request'}
                    </button>
                    <div style={{ marginTop: 15 }}>
                        {requests.length === 0
                            ? <p className="muted">No mentor requests yet.</p>
                            : requests.map(r => (
                                <div key={r.id} className="post">
                                    <b>{r.status}</b> — {r.message || 'Support requested'}
                                    <br /><small className="muted">{new Date(r.createdAt).toLocaleString()}</small>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </main>
        </>
    );
}
