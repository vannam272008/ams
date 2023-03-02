import React, { useEffect, useState } from 'react';
import { Container, Dropdown, NavItem } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as request from '../../utils/request';
import ConfirmModal from '../ConfirmModal';
import PopupChangePassword from '../PopupChangePassword';
import router from '../../Pages/App';
import './style.scss';

function Header() {
    const { id } = useParams();
    const locationDisplay = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('user_name'));
    const token = JSON.parse(localStorage.getItem('token')) || '';
    const location = JSON.parse(localStorage.getItem('location'));
    useEffect(() => {
        if (token) {
            setIsLogin(true);
        }
    }, [isLogin]);

    useEffect(() => {
        locationDisplay.pathname.substring(
            locationDisplay.pathname.indexOf('/') + 1
        );
    }, [locationDisplay]);

    const showModalLogout = () => {
        setShowLogout(true);
    };

    const handleCancelLogout = (show) => {
        setShowLogout(show);
    };

    const handleConfirmLogout = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        await request.remove('/session', headers);
        localStorage.removeItem('token');
        localStorage.removeItem('user_name');
        localStorage.removeItem('admin');
        localStorage.removeItem('first_login');
        localStorage.removeItem('location');
        const path = '/login';
        navigate(path);
        window.location.reload();
    };

    const showModalChangePass = () => {
        setShowChangePass(true);
    };

    const handleCancelChangePass = (show) => {
        setShowChangePass(show);
    };

    const handleConfirmChangePass = () => {};

    return (
        <div className="header">
            <Container>
                <span className="header__title">
                    {router.routes.map((item, index) => {
                        let curPath = locationDisplay.pathname;
                        if (id > 0) {
                            if (curPath.includes('manage-user'))
                                curPath = '/manage-user/edit/:id';
                            else if (curPath.includes('manage-asset'))
                                curPath = '/manage-asset/edit/:id';
                            else curPath = '/manage-assignment/edit/:id';
                        }
                        if (item.path === curPath) {
                            return (
                                <div key={index}>
                                    {item.label.map((i, index) => {
                                        return (
                                            <span
                                                key={index}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    navigate(i.path && i.path)
                                                }
                                            >
                                                {i.string}{' '}
                                            </span>
                                        );
                                    })}
                                </div>
                            );
                        }
                        return '';
                    })}
                </span>
                {!isLogin && (
                    <NavItem className="login">
                        <NavLink className="login-btn" to="/login">
                            Log In
                        </NavLink>
                    </NavItem>
                )}
                {isLogin && (
                    <Dropdown className="logout">
                        <Dropdown.Toggle className="logout-btn">
                            {userName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                Location: {location.location_prefix}
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="logout-item"
                                onClick={showModalChangePass}
                            >
                                Change Password
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="logout-item"
                                onClick={showModalLogout}
                            >
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
                <ConfirmModal
                    info={{
                        title: 'Are you sure?',
                        detail: 'Do you want to log out?',
                        contentBtn: 'Log out',
                        cancelBtn: 'Cancel',
                    }}
                    showModal={showLogout}
                    onCancel={handleCancelLogout}
                    onConfirm={handleConfirmLogout}
                />
                <PopupChangePassword
                    showModal={showChangePass}
                    onCancel={handleCancelChangePass}
                    onConfirm={handleConfirmChangePass}
                />
            </Container>
        </div>
    );
}

export default Header;
