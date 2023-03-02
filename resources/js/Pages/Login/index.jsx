import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import * as request from '../../utils/request';
import { AiFillEye } from 'react-icons/all';

import './style.scss';
import { useForm } from 'react-hook-form';

function Login() {
    const { handleSubmit } = useForm();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [failLogin, setFailLogin] = useState({ isFail: false, message: '' });
    const pass = useRef();

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const path = '/home';
            navigate(path);
        }
    }, []);

    const handleShowPassword = (password) => {
        if (password.current.type === 'password') {
            password.current.type = 'text';
        } else {
            password.current.type = 'password';
        }
    };

    const handleLogin = async () => {
        const data = {
            user_name: userName,
            password,
        };
        try {
            const res = await request.post('/session', data);
            localStorage.setItem(
                'token',
                JSON.stringify(res.data.data.remember_token)
            );
            localStorage.setItem(
                'user_name',
                JSON.stringify(res.data.data.user_name)
            );
            localStorage.setItem('admin', JSON.stringify(res.data.data.admin));
            localStorage.setItem(
                'first_login',
                JSON.stringify(res.data.data.first_login)
            );
            localStorage.setItem(
                'location',
                JSON.stringify(res.data.data.location)
            );
            window.location.reload();
        } catch (error) {
            setFailLogin({
                isFail: true,
                message: error.response.data.message,
            });
            setTimeout(() => {
                setFailLogin({
                    ...failLogin,
                    isFail: false,
                });
            }, 3000);
        }
    };

    return (
        <Container>
            <Row className="logo">
                <Col className="login-logo">
                    <img src={logo} alt="logo" />
                    <br />
                    <span>Online Asset Management</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="border__login">
                        <form
                            onSubmit={handleSubmit(handleLogin)}
                            className="form__login"
                        >
                            <span className="form__login-title">LOGIN</span>
                            <div className="login__user">
                                <label htmlFor="user_name">User Name</label>
                                <input
                                    id="user_name"
                                    type="text"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="login__password">
                                <label htmlFor="password">Password</label>
                                <div className="login__password-input">
                                    <input
                                        ref={pass}
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <AiFillEye
                                        className="show__password"
                                        onClick={() => handleShowPassword(pass)}
                                    />
                                </div>
                            </div>
                            {failLogin.isFail ? (
                                <span className="login-fail">
                                    {failLogin.message}
                                </span>
                            ) : (
                                ''
                            )}
                            <button
                                className="login__submit"
                                disabled={
                                    (userName === '' || password === '') && true
                                }
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
