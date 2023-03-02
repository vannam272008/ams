import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as request from '../../utils/request';
import { AiFillEye } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function PopupChangePassword(props) {
    const navigate = useNavigate();
    const { showModal, onCancel } = props;
    const [show, setShow] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [incorrcetPassword, setIncorrcetPassword] = useState(false);
    const [messageErrorOld, setMessageErrorOld] = useState('');
    const [messageErrorNew, setMessageErrorNew] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [changeSuccess, setChangeSuccess] = useState(false);
    const oldPass = useRef();
    const newPass = useRef();

    useEffect(() => {
        setShow(showModal);
    }, [showModal]);

    const handleShowPassword = (password) => {
        if (password.current.type === 'password') {
            password.current.type = 'text';
        } else {
            password.current.type = 'password';
        }
    };

    const handleSave = async () => {
        try {
            const data = {
                old_password: oldPassword,
                new_password: newPassword,
            };
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/user/change-password';
            const res = await request.patch(endpoint, data, headers);
            setMessageSuccess(res.data.message);
            setChangeSuccess(true);
        } catch (error) {
            setIncorrcetPassword(true);
            if (error.response.data.message) {
                setMessageErrorOld(error.response.data.message);
                oldPass.current.classList.add('focus');
                oldPass.current.focus();
            } else {
                setMessageErrorNew(
                    'Password must have at least 8 characters, containing number 0-9, 1 uppercase letter, 1 lowercase letter and 1 special character (#,$,&,@,...)'
                );
                newPass.current.classList.add('focus');
                newPass.current.focus();
            }
        }
    };

    const handleCancel = async () => {
        if (changeSuccess) {
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
        }
        setShow(false);
        setOldPassword('');
        setNewPassword('');
        setIncorrcetPassword(false);
        setChangeSuccess(false);
        if (onCancel) {
            onCancel(false);
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!changeSuccess ? (
                    <>
                        <div className="change__password">
                            <label htmlFor="old_password">Old Password</label>
                            <input
                                ref={oldPass}
                                id="old_password"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                    setIncorrcetPassword(false);
                                    setMessageErrorNew('');
                                    setMessageErrorOld('');
                                    oldPass.current.classList.remove('focus');
                                }}
                            />
                            <AiFillEye
                                className="show__password"
                                onClick={() => handleShowPassword(oldPass)}
                            />
                        </div>

                        {incorrcetPassword && messageErrorOld && (
                            <span className="incorrect-password">
                                {messageErrorOld}
                            </span>
                        )}

                        <div className="change__password new-pass">
                            <label htmlFor="new_password">New Password</label>
                            <input
                                ref={newPass}
                                id="new_password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setIncorrcetPassword(false);
                                    setMessageErrorNew('');
                                    setMessageErrorOld('');
                                    newPass.current.classList.remove('focus');
                                }}
                            />
                            <AiFillEye
                                className="show__password"
                                onClick={() => handleShowPassword(newPass)}
                            />
                        </div>

                        {incorrcetPassword && messageErrorNew && (
                            <span className="incorrect-password">
                                {messageErrorNew}
                            </span>
                        )}
                    </>
                ) : (
                    <span>{messageSuccess}</span>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!changeSuccess && (
                    <Button
                        variant="secondary"
                        onClick={handleSave}
                        disabled={
                            (oldPassword === '' || newPassword === '') && true
                        }
                    >
                        Save
                    </Button>
                )}
                <Button variant="primary" onClick={handleCancel}>
                    {!changeSuccess ? 'Cancel' : 'Close'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopupChangePassword;
