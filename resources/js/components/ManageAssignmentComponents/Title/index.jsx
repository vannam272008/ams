import React, { useState, useEffect } from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form,
    FormCheck,
    InputGroup,
} from 'react-bootstrap';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { BsCalendar2DateFill } from 'react-icons/bs';

import AlertMessage from '../../AlertMessage/AlertMessage';
import {
    setFilterAssignment,
    setSearchAssignment,
    setDateAssignment,
    setFirstShowAssignment,
} from '../../../Actions/userActions';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import * as request from '../../../utils/request';

import './style.scss';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Title = (props) => {
    const maxLength = 257;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [states, setStates] = useState([]);
    const [stateAll, setStateAll] = useState(true);
    const [selectedStates, setSelectedStates] = useState({});
    const [words, setWords] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [date, setDate] = useState('');

    const handleSelectAll = () => {
        props.setSuccessLoading(false);
        setStateAll(true);
        const selected = {};
        Object.keys(selectedStates).forEach((key) => {
            selected[key] = false;
        });
        setSelectedStates(selected);
        props.setCurrentPage(1);
        dispatch(setFirstShowAssignment({ data: {} }));
        dispatch(setFilterAssignment({ data: 'all' }));
    };

    const handleSelectStates = (id) => {
        props.setSuccessLoading(false);
        setStateAll(false);
        let filterValues = '';
        const selected = selectedStates;
        selected[id] = !selected[id];
        let noneSelected = true;
        Object.keys(selected).forEach((key) => {
            if (selected[key] === true) {
                filterValues += key + '+';
                noneSelected = false;
            }
        });
        if (noneSelected === true) {
            setStateAll(true);
            filterValues = 'all';
        }
        setSelectedStates(selected);
        dispatch(setFirstShowAssignment({ data: {} }));
        dispatch(setFilterAssignment({ data: filterValues }));
        props.setCurrentPage(1);
    };

    const onSearch = (event) => {
        event.preventDefault();
        if (event.target.value.length <= maxLength) {
            setWords(event.target.value);
            setShowMessage(false);
        } else {
            setWords(event.target.value.substring(0, maxLength));
            setShowMessage(true);
        }
    };

    const handleClickSearch = () => {
        const searchWords = words.replace(/[^a-zA-Z0-9\s]/g, '!');
        props.setSuccessLoading(false);
        props.setCurrentPage(1);
        dispatch(setFirstShowAssignment({ data: {} }));
        dispatch(setSearchAssignment({ data: searchWords }));
    };

    const handleRedirect = () => {
        props.setSuccessLoading(false);
        dispatch(setSearchAssignment(''));
        const path = '/manage-assignment/create';
        navigate(path);
    };

    // const setDateFilter = (date) => {
    //     props.setCurrentPage(1);
    //     const dateFormat = moment(date).format('YYYY-MM-DD');
    //     dispatch(setDateAssignment({ data: dateFormat }));
    //     dispatch(setFirstShowAssignment({ data: {} }));
    // };

    const handleDateFilter = (date) => {
        props.setSuccessLoading(false);
        setDate(date);
        const dateFormat = moment(new Date(date)).format('YYYY-MM-DD');
        dispatch(setFirstShowAssignment({ data: {} }));
        dispatch(setDateAssignment({ data: dateFormat }));
        console.log(dateFormat);
    };

    const fetchStates = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const endpoint = '/assignment-status';
        const res = await request.get(endpoint, headers);
        const selected = {};
        res.data.data.map((status) => (selected[status.id] = false));
        setStates(res.data.data);
        setSelectedStates(selected);
    };

    useEffect(() => {
        fetchStates();
    }, []);

    return (
        <div className="title-manage-assignment">
            <h5>
                <b>Assignment List</b>
            </h5>
            <div className="row-title-manage-assignment">
                <Col className="filter-assignment">
                    <div>
                        <Dropdown className="dropdown-title">
                            <Dropdown.Toggle
                                variant="danger"
                                id="dropdown-basic"
                            >
                                <span className="type">State</span>
                                <span className="fa-filter">
                                    <FaFilter />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <DropdownItem onClick={() => handleSelectAll()}>
                                    <InputGroup className="mb-2">
                                        <FormCheck
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={stateAll ? 'checked' : ''}
                                            className="checkbox-checked"
                                            disabled={true}
                                        />
                                        <span>All</span>
                                    </InputGroup>
                                </DropdownItem>
                                {states.map((status) => {
                                    return (
                                        <DropdownItem
                                            onClick={() =>
                                                handleSelectStates(status.id)
                                            }
                                            key={
                                                'assignment_status_' + status.id
                                            }
                                        >
                                            <InputGroup className="mb-2">
                                                <FormCheck
                                                    type="checkbox"
                                                    value={status.id}
                                                    onChange={
                                                        handleSelectStates
                                                    }
                                                    checked={
                                                        !!selectedStates[
                                                            status.id
                                                        ]
                                                    }
                                                    disabled={true}
                                                    className="checkbox-checked"
                                                />
                                                <span>
                                                    {
                                                        status.assignment_status_name
                                                    }
                                                </span>
                                            </InputGroup>
                                        </DropdownItem>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="box-control">
                        <div className="input-form-date-asm-list">
                            <DatePicker
                                todayButton={'Today'}
                                previousYearButtonLabel
                                placeholderText="Assigned Date"
                                dateFormat={'dd/MM/yyyy'}
                                showMonthDropdown
                                showYearDropdown
                                value={moment(date).format('DD/MM/YYYY')}
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
                                    ></MaskedTextInput>
                                }
                                onChange={(date) => handleDateFilter(date)}
                                max="2122-12-31"
                                min="1900-01-01"
                                className="date-picker-view"
                            />
                            <div className="fa-filter-date-asm">
                                <BsCalendar2DateFill />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="searh-btn-assignment">
                    <div className="col-search">
                        <InputGroup className="input-group">
                            <Form.Control
                                placeholder=""
                                aria-label=""
                                maxLength={maxLength + 1}
                                value={words}
                                onChange={onSearch}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        handleClickSearch();
                                    }
                                }}
                            />

                            <Button
                                variant="danger"
                                className="btn-search"
                                onClick={handleClickSearch}
                                disabled={
                                    words.length > maxLength && 'disabled'
                                }
                            >
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="col-create">
                        <Button
                            variant="danger"
                            className="btn-create-new-assignment"
                            onClick={handleRedirect}
                        >
                            Create New Assignment
                        </Button>
                    </div>
                </Col>
            </div>
            {showMessage && (
                <AlertMessage
                    variant="danger"
                    message={
                        'Field Search exceeds maximum length (' +
                        maxLength +
                        ')'
                    }
                    timeShow={3000}
                />
            )}
        </div>
    );
};

export default Title;
