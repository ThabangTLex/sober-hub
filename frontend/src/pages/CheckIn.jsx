import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

const MOODS = [
    { value: 'Great', emoji: '😊' },
    { value: 'Good', emoji: '🙂' },
    { value: 'Okay', emoji: '😐' },
    { value: 'Struggling', emoji: '😔' },
];

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

export default function CheckIn() {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');
    const [checkins, setCheckins] = useState([]);
    const [msg, setMsg] = useState('');

    const load = async () => {
        try {
            const res = await fetch('/api/checkins', { headers: authHeaders() });
            if (res.ok) setCheckins(await res.json());
        } catch (_) {}
    };

    useEffect(() => { load(); }, []);

    const save = async () => {
        if (!mood) return setMsg('Please select how you are feeling.');
        try {
            const res = await fetch('/api/checkins', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ mood, note }) });
            if (res.ok) { setMsg('Check-in saved! 💚'); setNote(''); setMood(''); load(); }
        } catch (_) { setMsg('Failed to save check-in.'); }
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">MEMBER ACTIVITY</span>
                <h1>Daily Check-in</h1>
                <p className="page-intro">Take a moment to reflect and track your activity.</p>

                <section className="form">
                    <h3>How are you feeling today?</h3>
                    <div className="moods">
                        {MOODS.map(m => (
                            <div key={m.value} className={`mood${mood === m.value ? ' selected' : ''}`} onClick={() => setMood(m.value)}>
                                <span>{m.emoji}</span>
                                <p>{m.value}</p>
                            </div>
                        ))}
                    </div>
                    <label>What would help you today?
                        <textarea rows={4} value={note} onChange={e => setNote(e.target.value)} placeholder="Write a short reflection..." />
                    </label>
                    {msg && <p style={{ color: 'var(--g)', fontSize: 13 }}>{msg}</p>}
                    <button className="btn primary" onClick={save}>Save Check-in</button>
                </section>

                <section className="dashcard" style={{ marginTop: 18 }}>
                    <h3>Recent check-ins</h3>
                    {checkins.length === 0
                        ? <p className="muted">No check-ins yet.</p>
                        : checkins.slice(0, 5).map(c => (
                            <div key={c.id} className="post">
                                <b>{c.mood}</b> — {c.note || 'No note added'}
                                <br /><small style={{ color: 'var(--muted)' }}>{new Date(c.createdAt).toLocaleString()}</small>
                            </div>
                        ))
                    }
                </section>
            </main>
        </>
    );
}
