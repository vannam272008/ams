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
import { useDispatch } from 'react-redux';
import {
    setAssetFilterState,
    setAssetFilterCategory,
    setFirstShowAsset,
    setAssetSearch,
} from '../../../Actions/userActions';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../AlertMessage/AlertMessage';
import * as request from '../../../utils/request';
import './Title.scss';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Title = (props) => {
    const maxLength = 128;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [assetStatus, setAssetStatus] = useState([]);
    const [selectedAssetStatus, setSelectedAssetStatus] = useState({});
    const [stateAll, setStateAll] = useState(true);
    const [categoryAll, setCategoryAll] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    // Type
    const handleSelectAllState = () => {
        props.setSuccessLoading(false);
        setStateAll(true);
        const selected = {};
        Object.keys(selectedAssetStatus).forEach((key) => {
            selected[key] = false;
        });
        setSelectedAssetStatus(selected);
        props.setCurrentPage(1);
        dispatch(setFirstShowAsset({ data: {} }));
        dispatch(setAssetFilterState('all'));
    };

    const handleSelectAllCategory = () => {
        props.setSuccessLoading(false);
        setCategoryAll(true);
        const selected = {};
        Object.keys(selectedCategories).forEach((key) => {
            selected[key] = false;
        });
        setSelectedCategories(selected);
        props.setCurrentPage(1);
        dispatch(setFirstShowAsset({ data: {} }));
        dispatch(setAssetFilterCategory('all'));
    };

    const handleSelectStates = (id) => {
        props.setSuccessLoading(false);
        setStateAll(false);
        let filterValues = '';
        const selected = selectedAssetStatus;
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
        setSelectedAssetStatus(selected);
        dispatch(setFirstShowAsset({ data: {} }));
        dispatch(setAssetFilterState(filterValues));
        props.setCurrentPage(1);
    };

    const handleSelectCategories = (id) => {
        props.setSuccessLoading(false);
        setCategoryAll(false);
        let filterValues = '';
        const selected = selectedCategories;
        selected[id] = !selected[id];
        let noneSelected = true;
        Object.keys(selected).forEach((key) => {
            if (selected[key] === true) {
                filterValues += key + '+';
                noneSelected = false;
            }
        });
        if (noneSelected === true) {
            setCategoryAll(true);
            filterValues = 'all';
        }
        setSelectedCategories(selected);
        dispatch(setFirstShowAsset({ data: {} }));
        dispatch(setAssetFilterCategory(filterValues));
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
        dispatch(setFirstShowAsset({ data: {} }));
        props.setCurrentPage(1);
        dispatch(setAssetSearch(searchWords));
    };

    const handleRedirect = () => {
        props.setSuccessLoading(false);
        dispatch(setAssetSearch(''));
        const path = '/manage-asset/create';
        navigate(path);
    };

    const fetchCategory = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const endpoint = '/category';
        const res = await request.get(endpoint, headers);
        const selected = {};
        res.data.data.map((category) => (selected[category.id] = false));
        setCategories(res.data.data);
        setSelectedCategories(selected);
    };

    const fetchStatus = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const endpoint = '/asset-status';
        const res = await request.get(endpoint, headers);
        const selected = {};
        res.data.data.map((status) => (selected[status.id] = false));
        setAssetStatus(res.data.data);
        setSelectedAssetStatus(selected);
    };

    useEffect(() => {
        fetchCategory();
        fetchStatus();
    }, []);

    return (
        <div className="title-manage-assignment">
            <h5>
                <b>Asset List</b>
            </h5>
            <div className="row-title-manage-assignment">
                {/* Filter */}
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
                                <DropdownItem
                                    onClick={() => handleSelectAllState()}
                                >
                                    <InputGroup className="mb-2">
                                        <FormCheck
                                            type="checkbox"
                                            onChange={handleSelectAllState}
                                            checked={!!stateAll}
                                            className="checkbox-checked"
                                            disabled={true}
                                        />
                                        <span>All</span>
                                    </InputGroup>
                                </DropdownItem>
                                {assetStatus.map((status) => {
                                    return (
                                        <DropdownItem
                                            onClick={() =>
                                                handleSelectStates(status.id)
                                            }
                                            key={'asset_status_' + status.id}
                                        >
                                            <InputGroup className="mb-2">
                                                <FormCheck
                                                    type="checkbox"
                                                    value={status.id}
                                                    onChange={
                                                        handleSelectStates
                                                    }
                                                    checked={
                                                        !!selectedAssetStatus[
                                                            status.id
                                                        ]
                                                    }
                                                    disabled={true}
                                                    className="checkbox-checked"
                                                />
                                                <span>
                                                    {status.asset_status_name}
                                                </span>
                                            </InputGroup>
                                        </DropdownItem>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <Dropdown className="dropdown-title-category">
                            <Dropdown.Toggle
                                variant="danger"
                                id="dropdown-basic"
                            >
                                <span className="type">Category</span>
                                <span className="fa-filter">
                                    <FaFilter />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <DropdownItem
                                    onClick={() => handleSelectAllCategory()}
                                >
                                    <InputGroup className="mb-2">
                                        <FormCheck
                                            type="checkbox"
                                            onChange={handleSelectAllCategory}
                                            checked={!!categoryAll}
                                            className="checkbox-checked"
                                            disabled={true}
                                        />
                                        <span>All</span>
                                    </InputGroup>
                                </DropdownItem>
                                {categories.map((category) => {
                                    return (
                                        <DropdownItem
                                            onClick={() =>
                                                handleSelectCategories(
                                                    category.id
                                                )
                                            }
                                            key={category.id}
                                        >
                                            <InputGroup className="mb-2">
                                                <FormCheck
                                                    type="checkbox"
                                                    value={category.id}
                                                    onChange={
                                                        handleSelectCategories
                                                    }
                                                    checked={
                                                        !!selectedCategories[
                                                            category.id
                                                        ]
                                                    }
                                                    disabled={true}
                                                    className="checkbox-checked"
                                                />
                                                <span>
                                                    {category.category_name}
                                                </span>
                                            </InputGroup>
                                        </DropdownItem>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className="searh-btn-asset">
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
                            className="btn-create-new-asset"
                            onClick={handleRedirect}
                        >
                            Create New Asset
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
