import { useState } from 'react';
import AppHeader from '../components/AppHeader';

function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('sh_token')}` };
}

export default function Settings() {
    const [form, setForm] = useState({ current: '', next: '', confirm: '' });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const changePassword = async (e) => {
        e.preventDefault();
        setMsg('');
        if (form.next.length < 8) return setMsg('New password must be at least 8 characters.');
        if (form.next !== form.confirm) return setMsg('New passwords do not match.');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
            });
            const data = await res.json();
            setMsg(res.ok ? 'Password changed successfully.' : (data.error || 'Failed to change password.'));
            if (res.ok) setForm({ current: '', next: '', confirm: '' });
        } catch (_) { setMsg('Failed to change password.'); }
        setLoading(false);
    };

    return (
        <>
            <AppHeader />
            <main className="page">
                <span className="eyebrow">ACCOUNT</span>
                <h1>Settings</h1>
                <p className="page-intro">Manage your communication preferences and account security.</p>

                <section className="form" style={{ marginBottom: 22 }}>
                    <h3 style={{ marginBottom: 4 }}>Notifications</h3>
                    {['Mentor notifications', 'Training reminders', 'Community updates'].map(label => (
                        <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}>
                            <input type="checkbox" defaultChecked style={{ accentColor: 'var(--g)' }} />
                            {label}
                        </label>
                    ))}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}>
                        <input type="checkbox" style={{ accentColor: 'var(--g)' }} />
                        Privacy mode
                    </label>
                </section>

                <section className="dashcard">
                    <h3>Change password</h3>
                    <form className="form" style={{ padding: 0, border: 0, boxShadow: 'none', marginTop: 12 }} onSubmit={changePassword}>
                        <label>Current password<input type="password" value={form.current} onChange={set('current')} required /></label>
                        <label>New password<input type="password" value={form.next} onChange={set('next')} required /></label>
                        <label>Confirm new password<input type="password" value={form.confirm} onChange={set('confirm')} required /></label>
                        {msg && <p style={{ color: msg.includes('success') ? 'var(--g)' : 'var(--red)', fontSize: 13 }}>{msg}</p>}
                        <button className="btn primary" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
