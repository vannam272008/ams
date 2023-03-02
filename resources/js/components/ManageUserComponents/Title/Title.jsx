import React, { useState } from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form,
    FormCheck,
    InputGroup,
} from 'react-bootstrap';
import './Title.scss';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
    setFilter,
    setFirstShowUser,
    setSearch,
} from '../../../Actions/userActions';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../AlertMessage/AlertMessage';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Title = (props) => {
    const maxLength = 257;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [typeAll, setTypeAll] = useState(true);
    const [selectedTypes, setSelectedTypes] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    // Type
    const handleSelectAll = () => {
        props.setSuccessLoading(false);
        setTypeAll(true);
        const selected = {};
        Object.keys(selectedTypes).forEach((key) => {
            selected[key] = false;
        });
        setSelectedTypes(selected);
        props.setCurrentPage(1);
        dispatch(setFirstShowUser({ data: {} }));
        dispatch(setFilter('all'));
    };

    const handleSelectTypes = (id) => {
        props.setSuccessLoading(false);
        setTypeAll(false);
        let filterValues = '';
        const selected = selectedTypes;
        selected[id] = !selected[id];
        let noneSelected = true;
        Object.keys(selected).forEach((key) => {
            if (selected[key] === true) {
                filterValues += key + '+';
                noneSelected = false;
            }
        });
        if (noneSelected === true) {
            setTypeAll(true);
            filterValues = 'all';
        }
        console.log(filterValues);
        setSelectedTypes(selected);
        dispatch(setFirstShowUser({ data: {} }));
        dispatch(setFilter(filterValues));
        props.setCurrentPage(1);
    };

    // Search
    const [words, setWords] = useState('');

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
        dispatch(setFirstShowUser({ data: {} }));
        props.setCurrentPage(1);
        dispatch(setSearch(searchWords));
    };

    const handleRedirect = () => {
        props.setSuccessLoading(false);
        dispatch(setSearch(''));
        const path = '/manage-user/create';
        navigate(path);
    };

    return (
        <div className="title-manage-user">
            <h5>
                <b style={{ color: '#cf2338' }}>User List</b>
            </h5>
            <div className="row-title-manage-user">
                <Col>
                    <Dropdown className="dropdown-title">
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            <span className="type">Type</span>
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
                                        checked={typeAll ? 'checked' : ''}
                                        className="checkbox-checked"
                                        disabled={true}
                                    />
                                    <span>All</span>
                                </InputGroup>
                            </DropdownItem>
                            <DropdownItem onClick={() => handleSelectTypes(1)}>
                                <InputGroup className="mb-2">
                                    <FormCheck
                                        type="checkbox"
                                        onChange={handleSelectTypes}
                                        checked={
                                            selectedTypes[1] ? 'checked' : ''
                                        }
                                        className="checkbox-checked"
                                        disabled={true}
                                    />
                                    <span>Admin</span>
                                </InputGroup>
                            </DropdownItem>
                            <DropdownItem onClick={() => handleSelectTypes(0)}>
                                <InputGroup className="mb-2">
                                    <FormCheck
                                        type="checkbox"
                                        onChange={handleSelectTypes}
                                        checked={
                                            selectedTypes[0] ? 'checked' : ''
                                        }
                                        className="checkbox-checked"
                                        disabled={true}
                                    />
                                    <span>Staff</span>
                                </InputGroup>
                            </DropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="search-user">
                    <div className="col-search">
                        <InputGroup className="input-group">
                            <Form.Control
                                placeholder=""
                                aria-label=""
                                value={words}
                                maxLength={maxLength + 1}
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
                            className="btn-create-new-user"
                            onClick={handleRedirect}
                        >
                            Create New User
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
