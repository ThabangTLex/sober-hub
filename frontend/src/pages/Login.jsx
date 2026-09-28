import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed.');
            localStorage.setItem('sh_token', data.token);
            localStorage.setItem('sh_user', JSON.stringify(data));
            navigate('/dashboard');
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
                <Link className="btn outline" to="/register">Create account</Link>
            </header>
            <main className="auth-page">
                <section className="auth-card">
                    <span className="eyebrow">MEMBER & STAFF ACCESS</span>
                    <h1>Welcome back</h1>
                    <p className="muted" style={{ marginBottom: 8 }}>Log in to access your Sober Hub account.</p>
                    {error && <div className="form-error">{error}</div>}
                    <form className="form" onSubmit={handleSubmit}>
                        <label>Email address
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
                        </label>
                        <label>Password
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required />
                        </label>
                        <button className="btn primary" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Log In'}
                        </button>
                    </form>
                    <p style={{ marginTop: 18, fontSize: 13 }}>
                        New to Sober Hub? <Link className="text-link" to="/register">Create an account</Link>
                    </p>
                </section>
            </main>
        </>
    );
}
