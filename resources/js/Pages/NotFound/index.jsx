import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

function NotFound() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (!token) {
            const path = '/login';
            navigate(path);
        } else if (token && location.pathname === '/') {
            const path = '/home';
            navigate(path);
        }
    }, []);

    const handleBackHome = () => {
        const path = '/home';
        navigate(path);
    };

    return (
        <div className="not-found">
            <span className="not-found-title">404</span>
            <span className="not-found-content">Page Not Found</span>
            <span onClick={handleBackHome} className="not-found-back">
                Go to Home Page
            </span>
        </div>
    );
}

export default NotFound;
