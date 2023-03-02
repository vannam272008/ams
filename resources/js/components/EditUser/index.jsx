import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { setFirstShowUser } from '../../Actions/userActions';
import * as request from '../../utils/request';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';

import './style.scss';

function EditUser() {
    const { handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [staffCode, setStaffCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [gender, setGender] = useState('');
    const [checkGender, setCheckGender] = useState(true);
    const [type, setType] = useState('');
    const [showMessageDob, setShowMessageDob] = useState(false);
    const [showMessageJd, setShowMessageJd] = useState(false);
    const [disabledSave, setDisabledSave] = useState(false);
    const [showErrorDateMessage, setShowErrorDateMessage] = useState('');
    const [showErrorDateOfBirthMessage, setShowErrorDateOfBirthMessage] =
        useState('');
    const [changeDob, setChangeDob] = useState(false);
    const [changeGender, setChangeGender] = useState(false);
    const [changeJd, setChangeJd] = useState(false);
    const [changeType, setChangeType] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const location_id = JSON.parse(
                    localStorage.getItem('location')
                ).id;
                const token = JSON.parse(localStorage.getItem('token'));
                const headers = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const res = await request.get(`/user/${id}`, headers);
                console.log(res.data.data);
                if (res.data.data.location.id !== location_id) {
                    handleRedirect();
                } else {
                    setUser(res.data.data);
                    setStaffCode(res.data.data.staff_code);
                    setFirstName(res.data.data.first_name);
                    setLastName(res.data.data.last_name);
                    setDob(res.data.data.date_of_birth);
                    setJoinedDate(res.data.data.joined_date);
                    setGender(res.data.data.gender.toString());
                    if (res.data.data.gender === 1) {
                        setCheckGender(false);
                    }

                    setType(res.data.data.type);
                }
            } catch (error) {
                handleRedirect();
                console.log(error.response.data.error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleRedirect = () => {
        const path = '/*';
        navigate(path);
    };

    const handleUpdate = async () => {
        await setDisabledSave(false);
        try {
            const data = {
                id,
                date_of_birth: moment(new Date(dob)).format('YYYY-MM-DD'),
                gender,
                joined_date: moment(new Date(joinedDate)).format('YYYY-MM-DD'),
                type: type === 'Admin' ? 1 : 0,
            };
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const endpoint = `/user/${id}`;
            await request.put(endpoint, data, headers);
            dispatch(
                setFirstShowUser({
                    data: {
                        ...user,
                        gender: gender === '0' ? 'Female' : 'Male',
                        date_of_birth: moment(new Date(dob)).format(
                            'YYYY-MM-DD'
                        ),
                        joined_date: moment(new Date(joinedDate)).format(
                            'YYYY-MM-DD'
                        ),
                        type,
                    },
                })
            );
            swal('Created user successfully').then(() => {});
            swal({
                text: 'Update user successfully!',
                dangerMode: true,
            }).then(() => {
                const path = '/manage-user';
                navigate(path);
            });
        } catch (error) {
            setDisabledSave(true);
            if (error.response.status === 422) {
                setShowErrorDateMessage('');
                setShowErrorDateOfBirthMessage('');
                if (
                    Math.abs(moment(new Date(dob)).diff(moment(), 'years')) >=
                    18
                ) {
                    setShowMessageJd(true);
                    setShowErrorDateMessage(
                        error.response.data.error.joined_date[0]
                    );
                }
                if (
                    Math.abs(moment(new Date(dob)).diff(moment(), 'years')) < 18
                ) {
                    setShowMessageDob(true);
                    setShowErrorDateOfBirthMessage(
                        error.response.data.error.date_of_birth[0]
                    );
                }
                if (moment(new Date(joinedDate)) <= moment(new Date(dob))) {
                    setShowMessageJd(true);
                    setShowErrorDateMessage(
                        error.response.data.error.joined_date[0]
                    );
                } else {
                    setShowMessageJd(true);
                    setShowErrorDateMessage(
                        error.response.data.error.joined_date[0]
                    );
                }
            }
        }
    };

    const handleChangeGender = (gen, check) => {
        setGender(gen);
        setCheckGender(check);
        if (
            gen === user.gender.toString() &&
            !changeDob &&
            !changeJd &&
            !changeType
        ) {
            setChangeGender(false);
            setDisabledSave(false);
        } else if (gen === user.gender.toString()) {
            setChangeGender(false);
            setDisabledSave(true);
        } else {
            setDisabledSave(true);
            setChangeGender(true);
        }
    };

    const handleChangeType = (typ) => {
        setType(typ);
        if (typ === user.type && !changeDob && !changeJd && !changeGender) {
            setDisabledSave(false);
            setChangeType(false);
        } else if (typ === user.type) {
            setChangeType(false);
            setDisabledSave(true);
        } else {
            setDisabledSave(true);
            setChangeType(true);
        }
    };

    const handleDob = (dob) => {
        setDob(dob);
        if (
            moment(new Date(dob)).format('YYYY-MM-DD') === user.date_of_birth &&
            !changeType &&
            !changeJd &&
            !changeGender
        ) {
            setChangeDob(false);
            setDisabledSave(false);
        } else if (
            moment(new Date(dob)).format('YYYY-MM-DD') === user.date_of_birth
        ) {
            setChangeDob(false);
            setDisabledSave(true);
        } else {
            setDisabledSave(true);
            setChangeDob(true);
            setShowMessageDob(false);
        }
    };

    const handleJd = (jd) => {
        setJoinedDate(jd);
        if (
            moment(new Date(jd)).format('YYYY-MM-DD') === user.joined_date &&
            !changeType &&
            !changeDob &&
            !changeGender
        ) {
            setChangeJd(false);
            setDisabledSave(false);
        } else if (
            moment(new Date(jd)).format('YYYY-MM-DD') === user.joined_date
        ) {
            setChangeJd(false);
            setDisabledSave(true);
        } else {
            setDisabledSave(true);
            setChangeJd(true);
            setShowMessageJd(false);
        }
    };

    return (
        <Container className="container-edit">
            <form className="row" onSubmit={handleSubmit(handleUpdate)}>
                <Row className="box-container">
                    <Col className="title-edit-user">
                        <span>Edit User</span>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Staff Code</span>
                        <input defaultValue={staffCode} disabled={true} />
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>First Name</span>
                        <input
                            placeholder="Frist Name"
                            defaultValue={firstName}
                            disabled={true}
                        />
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Last Name</span>
                        <input
                            placeholder="Last Name"
                            defaultValue={lastName}
                            disabled={true}
                        />
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Date of Birth</span>
                        <div className="input-form">
                            <div className="flex-date">
                                <DatePicker
                                    todayButton={'Today'}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat={'dd/MM/yyyy'}
                                    showMonthDropdown
                                    showYearDropdown
                                    value={moment(dob).format('DD/MM/YYYY')}
                                    customInput={
                                        <MaskedTextInput
                                            type="text"
                                            mask={[
                                                /\d/,
                                                /\d/,
                                                '/',
                                                /\d/,
                                                /\d/,
                                                '/',
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                            ]}
                                        />
                                    }
                                    onChange={(dob) => handleDob(dob)}
                                    max="2122-12-31"
                                    min="1900-01-01"
                                    className={showMessageDob ? 'error' : ''}
                                />
                                <BsCalendar2DateFill />
                            </div>
                            {showMessageDob && (
                                <label className="form-check-label-add-user">
                                    {showErrorDateOfBirthMessage}
                                </label>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-gender">
                        <span className="title-gender">Gender</span>
                        <div className="mb-3">
                            <Form.Check
                                inline
                                label="Female"
                                name="gender"
                                type="radio"
                                value={0}
                                checked={checkGender}
                                onChange={(e) =>
                                    handleChangeGender(e.target.value, true)
                                }
                                id={`inline-${gender}-female`}
                            />
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                type="radio"
                                value={1}
                                checked={!checkGender}
                                onChange={(e) =>
                                    handleChangeGender(e.target.value, false)
                                }
                                id={`inline-${gender}-male`}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Joined Date</span>
                        <div className="input-form">
                            <div className="flex-date">
                                <DatePicker
                                    todayButton={'Today'}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat={'dd/MM/yyyy'}
                                    showMonthDropdown
                                    showYearDropdown
                                    value={moment(joinedDate).format(
                                        'DD/MM/YYYY'
                                    )}
                                    customInput={
                                        <MaskedTextInput
                                            type="text"
                                            mask={[
                                                /\d/,
                                                /\d/,
                                                '/',
                                                /\d/,
                                                /\d/,
                                                '/',
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                            ]}
                                        />
                                    }
                                    onChange={(joinedDate) =>
                                        handleJd(joinedDate)
                                    }
                                    max="2122-12-31"
                                    min="1900-01-01"
                                    className={showMessageJd ? 'error' : ''}
                                />
                                <BsCalendar2DateFill />
                            </div>
                            {showMessageJd && (
                                <label className="form-check-label-add-user">
                                    {showErrorDateMessage}
                                </label>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Type</span>
                        <Dropdown className="type">
                            <Dropdown.Toggle className="type-btn type-edit type-toggle">
                                {type}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="type-menu">
                                <Dropdown.Item
                                    className="type-item"
                                    eventKey="staff"
                                    value={0}
                                    onClick={() => handleChangeType('Staff')}
                                >
                                    Staff
                                </Dropdown.Item>

                                <Dropdown.Item
                                    className="type-item"
                                    eventKey="admin"
                                    value={1}
                                    onClick={() => handleChangeType('Admin')}
                                >
                                    Admin
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row className="box-container" xs="auto">
                    <Col className="box-button">
                        <button
                            className="btn-cancel"
                            onClick={() => navigate('/manage-user')}
                        >
                            Cancel
                        </button>
                        <button className="btn-save" disabled={!disabledSave}>
                            Save
                        </button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default EditUser;
