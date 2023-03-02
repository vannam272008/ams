import React, { useState } from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form,
    FormCheck,
    InputGroup,
} from 'react-bootstrap';
import { FaFilter, FaSearch } from 'react-icons/fa';
import AlertMessage from '../../AlertMessage/AlertMessage';
import {
    setFilterRequest,
    setReturnedDate,
    setSearchRequest,
} from '../../../Actions/userActions';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';

import './style.scss';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Title = (props) => {
    const maxLength = 128;
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [stateAll, setStateAll] = useState(true);
    const [selectedStates, setSelectedStates] = useState({});
    const [words, setWords] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [date, setDate] = useState('');

    const handleSelectAll = () => {
        setStateAll(true);
        const selected = {};
        Object.keys(selectedStates).forEach((key) => {
            selected[key] = false;
        });
        setSelectedStates(selected);
        props.setCurrentPage(1);
        dispatch(setFilterRequest({ data: 'all' }));
        props.setSuccessLoading(false);
    };

    const handleSelectStates = (id) => {
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
        dispatch(setFilterRequest({ data: filterValues }));
        props.setCurrentPage(1);
        props.setSuccessLoading(false);
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
        props.setCurrentPage(1);
        dispatch(setSearchRequest({ data: searchWords }));
        props.setSuccessLoading(false);
    };

    // const handleRedirect = () => {
    //     dispatch(setSearchAssignment(''));
    //     const path = '/manage-assignment/create';
    //     navigate(path);
    // };

    // const setDateFilter = (date) => {
    //     props.setCurrentPage(1);
    //     const dateFormat = moment(date).format('YYYY-MM-DD');
    //     dispatch(setDateAssignment({ data: dateFormat }));
    //     dispatch(setFirstShowAssignment({ data: {} }));
    // };

    const handleDateFilter = (date) => {
        setDate(date);
        const dateFormat = moment(new Date(date)).format('YYYY-MM-DD');
        dispatch(setReturnedDate({ data: dateFormat }));
        props.setSuccessLoading(false);
    };

    return (
        <div className="title-manage-assignment">
            <h5>
                <b>Request List</b>
            </h5>
            <div className="row-title-manage-assignment">
                <Col className="filer-request">
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
                                <DropdownItem
                                    onClick={() => handleSelectStates(1)}
                                >
                                    <InputGroup className="mb-2">
                                        <FormCheck
                                            type="checkbox"
                                            onChange={handleSelectStates}
                                            checked={
                                                selectedStates[1]
                                                    ? 'checked'
                                                    : ''
                                            }
                                            className="checkbox-checked"
                                            disabled={true}
                                        />
                                        <span>Completed</span>
                                    </InputGroup>
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => handleSelectStates(2)}
                                >
                                    <InputGroup className="mb-2">
                                        <FormCheck
                                            type="checkbox"
                                            onChange={handleSelectStates}
                                            checked={
                                                selectedStates[2]
                                                    ? 'checked'
                                                    : ''
                                            }
                                            className="checkbox-checked"
                                            disabled={true}
                                        />
                                        <span>Waiting for returning</span>
                                    </InputGroup>
                                </DropdownItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="box-control">
                        <div className="input-form-date-asm-list">
                            <DatePicker
                                todayButton={'Today'}
                                previousYearButtonLabel
                                placeholderText="Returned Date"
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
                                    />
                                }
                                onChange={(date) => handleDateFilter(date)}
                                max="2122-12-31"
                                min="1900-01-01"
                                className="date-picker-view"
                            />
                            <span className="fa-filter-date-asm">
                                <BsCalendar2DateFill />
                            </span>
                        </div>
                    </div>
                </Col>

                <Col className="col-search-request">
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
                            disabled={words.length > maxLength && 'disabled'}
                        >
                            <FaSearch />
                        </Button>
                    </InputGroup>
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
