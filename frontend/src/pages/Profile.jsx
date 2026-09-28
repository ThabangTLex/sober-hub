import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

export default function Profile() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/profile', { headers: authHeaders() })
            .then(r => r.json())
            .then(d => setForm({ firstName: d.firstName, lastName: d.lastName, email: d.email, phone: d.phone || '' }))
            .catch(() => {});
    }, []);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const save = async () => {
        setLoading(true);
        setMsg('');
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, phone: form.phone }),
            });
            if (res.ok) {
                setMsg('Profile updated successfully.');
                const stored = JSON.parse(localStorage.getItem('sh_user') || '{}');
                localStorage.setItem('sh_user', JSON.stringify({ ...stored, firstName: form.firstName, lastName: form.lastName }));
            }
        } catch (_) { setMsg('Failed to update profile.'); }
        setLoading(false);
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">MEMBER PROFILE</span>
                <h1>My Profile</h1>
                <p className="page-intro">Manage your Sober Hub member information.</p>

                <section className="form">
                    <div className="formgrid">
                        <label>First name<input value={form.firstName} onChange={set('firstName')} /></label>
                        <label>Last name<input value={form.lastName} onChange={set('lastName')} /></label>
                        <label>Email<input value={form.email} readOnly style={{ background: '#f5f5f5' }} /></label>
                        <label>Phone<input value={form.phone} onChange={set('phone')} placeholder="e.g. 071 234 5678" /></label>
                    </div>
                    {msg && <p style={{ color: 'var(--g)', fontSize: 13 }}>{msg}</p>}
                    <button className="btn primary" onClick={save} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </section>
            </main>
        </>
    );
}
