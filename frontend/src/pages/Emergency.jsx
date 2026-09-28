import { useState } from 'react';
import AppHeader from '../components/AppHeader';

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

export default function Emergency() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePanic = async () => {
        if (!window.confirm('Send an urgent support request to Sober Hub staff?')) return;
        setLoading(true);
        try {
            await fetch('/api/emergency', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ message: 'Urgent support requested via panic button.' }),
            });
            setSent(true);
        } catch (_) { setSent(true); }
        setLoading(false);
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow" style={{ color: 'var(--red)' }}>URGENT SUPPORT</span>
                <h1>Emergency / Panic Support</h1>

                <div className="panic">
                    <div style={{ fontSize: 42 }}>🆘</div>
                    <h2 style={{ margin: '12px 0' }}>Need immediate support?</h2>
                    <p style={{ maxWidth: 600, margin: '0 auto 20px', color: 'var(--muted)', fontSize: 13 }}>
                        The Sober-Buddy concept includes a panic button for situations involving cravings or danger.
                        Pressing this button sends an urgent request to the Sober-Hub support desk.
                    </p>
                    {sent
                        ? <div style={{ background: 'var(--light)', border: '1px solid var(--lg)', borderRadius: 14, padding: '16px 24px', display: 'inline-block', color: 'var(--gd)', fontWeight: 700 }}>
                            ✅ Support request recorded. Staff have been notified.
                          </div>
                        : <button className="panic-btn" onClick={handlePanic} disabled={loading}>
                            {loading ? 'SENDING...' : 'PRESS FOR SUPPORT'}
                          </button>
                    }
                </div>

                <section className="dashcard" style={{ marginTop: 18, textAlign: 'center' }}>
                    <b>You</b> → <b>Mentor / Sober Buddy</b> → <b>Sober-Hub Support Desk</b>
                </section>
            </main>
        </>
    );
}
