import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { setFirstShowUser } from '../../Actions/userActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import * as request from '../../utils/request';
import AlertFieldMessage from '../AlertFiledMessage';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';

import './style.scss';

function AddUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminLocation = JSON.parse(localStorage.getItem('location'));
    const { handleSubmit } = useForm();

    const [locations, setLocations] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [selectedGender, setSelectedGener] = useState('');
    const [selectedType, setSelectedType] = useState('staff');
    const [location, setLocation] = useState(adminLocation.id);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showMessageDob, setShowMessageDob] = useState(false);
    const [showMessageJd, setShowMessageJd] = useState(false);
    const [showMessageFirstName, setShowMessageFirstName] = useState(false);
    const [showMessageLastName, setShowMessageLastName] = useState(false);
    const [showErrorDateMessage, setShowErrorDateMessage] = useState('');
    const [showErrorDateOfBirthMessage, setShowErrorDateOfBirthMessage] =
        useState('');
    const [showErrorFirstNameMessage, setShowErrorFirstNameMessage] =
        useState('');
    const [showErrorLastNameMessage, setShowErrorLastNameMessage] =
        useState('');
    const [disabledSave, setDisabledSave] = useState(false);

    const handleAdd = async () => {
        await setDisabledSave(false);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/user';
            const data = {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                date_of_birth: moment(new Date(dob)).format('YYYY-MM-DD'),
                gender: selectedGender,
                joined_date: moment(new Date(joinedDate)).format('YYYY-MM-DD'),
                admin: selectedType === 'admin' ? 1 : 0,
                location_id:
                    selectedType === 'admin' ? location : adminLocation.id,
            };
            const response = await request.post(endpoint, data, headers);

            console.log(response.data.data);
            swal('Created user successfully').then(() => {});
            swal({
                text: 'Created user successfully!',
                dangerMode: true,
            }).then(() => {
                const path = '/manage-user';
                navigate(path);
            });
            dispatch(
                setFirstShowUser({
                    data: {
                        ...response.data.data,
                        full_name:
                            response.data.data.first_name +
                            ' ' +
                            response.data.data.last_name,
                        type:
                            response.data.data.admin === 1 ? 'Admin' : 'Staff',
                        gender:
                            response.data.data.gender === '1'
                                ? 'Male'
                                : 'Female',
                        location: response.data.data.location,
                    },
                })
            );
        } catch (error) {
            if (error.response.status === 422) {
                setDisabledSave(true);
                setShowErrorDateMessage('');
                setShowErrorDateOfBirthMessage('');
                setShowErrorFirstNameMessage('');
                setShowErrorLastNameMessage('');
                if (error.response.data.error.first_name) {
                    setShowErrorFirstNameMessage(
                        error.response.data.error.first_name[0]
                    );
                }
                if (error.response.data.error.last_name) {
                    setShowErrorLastNameMessage(
                        error.response.data.error.last_name[0]
                    );
                }
                if (
                    Math.abs(
                        moment(new Date(dob)).diff(
                            new Date(joinedDate),
                            'years'
                        )
                    ) < 18
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
    const handleSelectUserType = (event) => {
        setSelectedType(event);
        setDisabledSave(true);
    };

    const handleDay = (dob) => {
        setDob(dob);
        setShowMessageDob(false);
        setShowErrorDateOfBirthMessage('');
        setDisabledSave(true);
    };

    const handleJoinedDate = (joinedDate) => {
        setJoinedDate(joinedDate);
        setShowMessageJd(false);
        setShowErrorDateMessage('');
        setDisabledSave(true);
    };

    const onFirstName = (event) => {
        const replaceName = event.target.value.replace(/\s/g, '');
        if (replaceName.length <= 128) {
            setShowMessageFirstName(false);
            event.preventDefault();
            setFirstName(replaceName);
        } else {
            setFirstName(replaceName.substring(0, 128));
            setShowMessageFirstName(true);
        }
        setDisabledSave(true);
    };

    const onLastName = (event) => {
        if (event.target.value.length <= 128) {
            setShowMessageLastName(false);
            event.preventDefault();
            setLastName(event.target.value);
        } else {
            setLastName(event.target.value.substring(0, 128));
            setShowMessageLastName(true);
        }
        setDisabledSave(true);
    };

    useEffect(() => {
        const fetchLocation = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/location';
            const res = await request.get(endpoint, headers);
            setLocations(res.data);
            setLocation(1);
            setSelectedLocation(res.data[0].location_name);
        };
        fetchLocation();
    }, []);

    return (
        <Container className="container-edit">
            <form className="row" onSubmit={handleSubmit(handleAdd)}>
                <Row className="box-container">
                    <Col className="title-edit-user">
                        <span>Create New User</span>
                    </Col>
                </Row>
                <Row className="box-container">
                    <Col className="box-control">
                        <span>First Name</span>
                        <div className="input-form">
                            <input
                                value={firstName}
                                placeholder="First Name"
                                maxLength={129}
                                onChange={onFirstName}
                                className={
                                    showMessageFirstName ||
                                    showErrorFirstNameMessage.length > 0
                                        ? 'error'
                                        : undefined
                                }
                            />

                            {showMessageFirstName &&
                                showErrorFirstNameMessage.length === 0 && (
                                    <AlertFieldMessage
                                        message={
                                            'Field First Name exceeds maximum length (128)'
                                        }
                                        timeShow={3000}
                                        className="form-check-label-add-user"
                                    />
                                )}

                            {showErrorFirstNameMessage.length > 0 && (
                                <AlertFieldMessage
                                    message={showErrorFirstNameMessage}
                                    className="form-check-label-add-user"
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Last Name</span>
                        <div className="input-form">
                            <input
                                value={lastName}
                                placeholder="Last Name"
                                maxLength={129}
                                onChange={onLastName}
                                className={
                                    showMessageLastName ||
                                    showErrorLastNameMessage.length > 0
                                        ? 'error'
                                        : undefined
                                }
                            />
                            {showMessageLastName &&
                                showErrorLastNameMessage.length === 0 && (
                                    <AlertFieldMessage
                                        message={
                                            'Field Last Name exceeds maximum length (128)'
                                        }
                                        timeShow={3000}
                                        className="form-check-label-add-user"
                                    />
                                )}
                            {showErrorLastNameMessage.length > 0 && (
                                <AlertFieldMessage
                                    message={showErrorLastNameMessage}
                                    className="form-check-label-add-user"
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Date of Birth</span>
                        <div className="input-form">
                            <div className="flex-date">
                                <DatePicker
                                    max="2122-12-31"
                                    min="1900-01-01"
                                    showMonthDropdown
                                    showYearDropdown
                                    defaultValue={dob}
                                    todayButton={'Today'}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat={'dd/MM/yyyy'}
                                    selected={dob}
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
                                    onChange={(dob) => handleDay(dob)}
                                    className={showMessageDob ? 'error' : ''}
                                />
                                <BsCalendar2DateFill />
                            </div>
                            {showMessageDob && (
                                <AlertFieldMessage
                                    message={showErrorDateOfBirthMessage}
                                    className="form-check-label-add-user"
                                />
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
                                value={0}
                                type="radio"
                                onChange={(e) => {
                                    setSelectedGener(e.target.value);
                                    setDisabledSave(true);
                                }}
                            />
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                value={1}
                                type="radio"
                                onChange={(e) => {
                                    setSelectedGener(e.target.value);
                                    setDisabledSave(true);
                                }}
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
                                    max="2122-12-31"
                                    min="1900-01-01"
                                    defaultValue={joinedDate}
                                    todayButton={'Today'}
                                    showMonthDropdown
                                    showYearDropdown
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat={'dd/MM/yyyy'}
                                    selected={joinedDate}
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
                                        handleJoinedDate(joinedDate)
                                    }
                                    className={
                                        showMessageJd &&
                                        showErrorDateMessage.length > 0
                                            ? 'error'
                                            : ''
                                    }
                                />
                                <BsCalendar2DateFill />
                            </div>

                            {showMessageJd &&
                                showErrorDateMessage.length > 0 && (
                                    <AlertFieldMessage
                                        message={showErrorDateMessage}
                                        className="form-check-label-add-user"
                                    />
                                )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Type</span>
                        <Dropdown
                            className="type"
                            onSelect={handleSelectUserType}
                        >
                            <Dropdown.Toggle className="type-btn type-edit type-toggle">
                                {selectedType === '' && 'Staff'}
                                {selectedType === 'admin' && 'Admin'}
                                {selectedType === 'staff' && 'Staff'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="type-menu">
                                <Dropdown.Item
                                    className="type-item"
                                    value={1}
                                    checked={selectedType === 0}
                                    eventKey="staff"
                                >
                                    Staff
                                </Dropdown.Item>

                                <Dropdown.Item
                                    className="type-item"
                                    value={0}
                                    checked={selectedType === 1}
                                    eventKey="admin"
                                >
                                    Admin
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {selectedType === 'admin' && (
                    <Row className="box-container">
                        <Col className="box-control">
                            <span>Location</span>
                            <Dropdown className="type">
                                <Dropdown.Toggle className="type-btn type-edit type-toggle">
                                    {selectedLocation}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="type-menu">
                                    {locations.map((locations) => (
                                        <Dropdown.Item
                                            key={locations.id}
                                            className="type-item"
                                            onClick={() => {
                                                setLocation(locations.id);
                                                setSelectedLocation(
                                                    locations.location_name
                                                );
                                            }}
                                        >
                                            {locations.location_name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                )}

                <Row className="box-container" xs="auto">
                    <Col className="box-button">
                        <button
                            className="btn-cancel"
                            onClick={() => navigate('/manage-user')}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-save"
                            type="submit"
                            disabled={
                                (firstName === '' ||
                                    lastName === '' ||
                                    selectedGender === '' ||
                                    dob === '' ||
                                    joinedDate === '' ||
                                    !disabledSave) &&
                                true
                            }
                        >
                            Save
                        </button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AddUser;
