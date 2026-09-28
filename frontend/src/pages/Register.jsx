import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [role, setRole] = useState('member');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirm) return setError('Passwords do not match.');
        if (form.password.length < 8) return setError('Password must be at least 8 characters.');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password, role }),
            });
            let data = {};
            try { data = await res.json(); } catch (_) {}
            if (!res.ok) throw new Error(data.error || 'Registration failed.');
            setSuccess('Account created! You can now log in.');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="auth-header" style={{ padding: '12px 5%' }}>
                <Link className="brand" to="/"><span className="logo">SH</span>Sober Hub</Link>
                <Link className="btn outline" to="/login">Log in</Link>
            </header>
            <main className="auth-page">
                <section className="auth-card" style={{ width: 'min(560px,100%)' }}>
                    <span className="eyebrow">CREATE YOUR ACCOUNT</span>
                    <h1>Sign up</h1>
                    <p className="muted">Join Sober Hub and access support, skills and community.</p>
                    <div className="role-tabs">
                        <button type="button" className={`role-tab${role === 'member' ? ' active' : ''}`} onClick={() => setRole('member')}>Member</button>
                        <button type="button" className={`role-tab${role === 'staff' ? ' active' : ''}`} onClick={() => setRole('staff')}>Staff</button>
                    </div>
                    {error && <div className="form-error">{error}</div>}
                    {success && <div className="form-success">{success}</div>}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="formgrid">
                            <label>First name<input value={form.firstName} onChange={set('firstName')} placeholder="e.g. Thabo" required /></label>
                            <label>Last name<input value={form.lastName} onChange={set('lastName')} placeholder="e.g. Dlamini" required /></label>
                            <label>Email address<input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required /></label>
                            <label>Phone number<input type="tel" value={form.phone} onChange={set('phone')} placeholder="e.g. 071 234 5678" /></label>
                        </div>
                        <label>Password<input type="password" value={form.password} onChange={set('password')} placeholder="At least 8 characters" required /></label>
                        <label>Confirm password<input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Confirm password" required /></label>
                        <button className="btn primary" type="submit" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                    <p style={{ marginTop: 18, fontSize: 13 }}>
                        Already have an account? <Link className="text-link" to="/login">Log in</Link>
                    </p>
                </section>
            </main>
        </>
    );
}
