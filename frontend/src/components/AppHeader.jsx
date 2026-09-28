import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('sh_token');
        localStorage.removeItem('sh_user');
        navigate('/login');
    };

    return (
        <header className="app-header">
            <a className="brand" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <span className="logo">SH</span>Sober Hub
            </a>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <a className="back" href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>← Dashboard</a>
                <button className="btn outline" onClick={logout}>Log out</button>
            </div>
        </header>
    );
}
