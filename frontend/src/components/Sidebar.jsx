import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const logout = () => {
        localStorage.removeItem('sh_token');
        localStorage.removeItem('sh_user');
        navigate('/login');
    };

    const link = (to) => ({
        className: pathname === to ? 'active' : '',
        onClick: (e) => { e.preventDefault(); navigate(to); },
        href: '#',
    });

    return (
        <aside className="side">
            <small>MAIN</small>
            <a {...link('/dashboard')}>🏠 Dashboard</a>
            <a {...link('/profile')}>👤 My Profile</a>
            <a {...link('/checkin')}>💚 Daily Check-in</a>
            <a {...link('/community')}>👥 Community</a>
            <small>SUPPORT & GROWTH</small>
            <a {...link('/skills')}>🎓 Skills Hub</a>
            <a {...link('/mentor')}>💬 Mentor Chat</a>
            <a {...link('/emergency')}>🆘 Emergency Support</a>
            <a {...link('/employment')}>💼 Employment</a>
            <small>ACCOUNT</small>
            <a {...link('/payment')}>💳 Membership</a>
            <a {...link('/settings')}>⚙️ Settings</a>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>🚪 Log out</a>
        </aside>
    );
}
