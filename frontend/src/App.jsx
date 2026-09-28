import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import Community from './pages/Community';
import Mentor from './pages/Mentor';
import Emergency from './pages/Emergency';
import Skills from './pages/Skills';
import Employment from './pages/Employment';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import Settings from './pages/Settings';

function PrivateRoute({ children }) {
    return localStorage.getItem('sh_token') ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/checkin" element={<PrivateRoute><CheckIn /></PrivateRoute>} />
                <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
                <Route path="/mentor" element={<PrivateRoute><Mentor /></PrivateRoute>} />
                <Route path="/emergency" element={<PrivateRoute><Emergency /></PrivateRoute>} />
                <Route path="/skills" element={<PrivateRoute><Skills /></PrivateRoute>} />
                <Route path="/employment" element={<PrivateRoute><Employment /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
