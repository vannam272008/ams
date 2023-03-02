import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TiTick } from 'react-icons/ti';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
import * as request from '../../utils/request';
import { setFirstShowAsset } from '../../Actions/userActions';
import AlertFieldMessage from '../AlertFiledMessage';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';

import './style.scss';

const AddAsset = () => {
    const { handleSubmit } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [statusId, setStatusId] = useState(1);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [assetName, setName] = useState('');
    const [assetSpecification, setAssetSpecification] = useState('');
    const [assetInstalledDate, setAssetInstalledDate] = useState('');
    const [showBtnAddNewCategory, setShowBtnAddNewCategory] = useState(true);
    const [showAddNewCategory, setShowAddNewCategory] = useState(false);
    const [showSpecificationMessage, setShowSpecificationMessage] =
        useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryPrefix, setCategoryPrefix] = useState('');
    const [createCategorySuccess, setCreateCategorySuccess] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [assetNameMessage, setAssetNameMessage] = useState('');
    const [assetSpecificationMessage, setAssetSpecificationMessage] =
        useState('');
    const [categoryNameMessage, setCategoryNameMessage] = useState('');
    const [categoryPrefixMessage, setCategoryPrefixMessage] = useState('');
    const [categoryFirstShow, setCategoryFirstShow] = useState([]);
    const assetNameRef = useRef();
    const assetSpecificationRef = useRef();
    const categoryNameRef = useRef();
    const categoryPrefixRef = useRef();
    const [disabledSave, setDisabledSave] = useState(false);

    const handleClickBtnAddNewCategory = () => {
        setShowAddNewCategory(true);
        setShowBtnAddNewCategory(false);
    };

    const handleClickCloseNewCategory = () => {
        setShowBtnAddNewCategory(true);
        setShowAddNewCategory(false);
    };

    const onChangeAssetName = (event) => {
        setAssetNameMessage('');
        if (event.target.value.length <= 128) {
            setShowMessage(false);
            event.preventDefault();
            setName(event.target.value);
        } else {
            setName(event.target.value.substring(0, 128));
            setShowMessage(true);
        }
        setDisabledSave(true);
    };

    const onChangeAssetSpecification = (event) => {
        if (event.target.value.length <= 256) {
            setAssetSpecification(event.target.value);
            setShowSpecificationMessage(false);
        } else {
            setAssetSpecification(event.target.value.substring(0, 256));
            setShowSpecificationMessage(true);
        }
        setAssetSpecificationMessage('');
        event.preventDefault();
        setDisabledSave(true);
    };

    const handleClickState = (event) => {
        setStatusId(event.target.value);
        setDisabledSave(true);
    };

    const handleAddAsset = async () => {
        await setDisabledSave(false);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/asset';
            const data = {
                asset_name: assetName.trim(),
                asset_specification: assetSpecification,
                asset_installed_date: moment(
                    new Date(assetInstalledDate)
                ).format('YYYY-MM-DD'),
                category_id: categoryId,
                status_id: statusId,
            };

            const response = await request.post(endpoint, data, headers);

            dispatch(setFirstShowAsset({ data: response.data.data }));

            swal('Created asset successfully').then(() => {});
            swal({
                text: 'Created asset successfully!',
                dangerMode: true,
            }).then(() => {
                const path = '/manage-asset';
                navigate(path);
            });

            // console.log(response.data.data);
            // dispatch(
            //     setFirstShowUser({
            //         data: {
            //             ...response.data.data,
            //             full_name:
            //                 response.data.data.first_name +
            //                 ' ' +
            //                 response.data.data.last_name,
            //             type:
            //                 response.data.data.admin === 1 ? 'Admin' : 'Staff',
            //             gender:
            //                 response.data.data.gender === '1'
            //                     ? 'Male'
            //                     : 'Female',
            //             location: response.data.data.location,
            //         },
            //     })
            // );
        } catch (error) {
            setDisabledSave(true);
            if (error.response.status === 422) {
                console.log(error.response);
                setAssetNameMessage('');
                setAssetSpecificationMessage('');
                if (error.response.data.Errors.asset_name) {
                    assetNameRef.current.focus();
                    setShowMessage(true);
                    setAssetNameMessage(
                        error.response.data.Errors.asset_name[0]
                    );
                }
                if (error.response.data.Errors.asset_specification) {
                    assetSpecificationRef.current.focus();
                    setAssetSpecificationMessage(
                        error.response.data.Errors.asset_specification[0]
                    );
                }
            }
        }
    };

    const onChangeCategoryName = (event) => {
        if (event.target.value.length <= 30) {
            setCategoryNameMessage('');
            event.preventDefault();
            setCategoryName(event.target.value);
        } else {
            setCategoryName(event.target.value.substring(0, 30));
            setCategoryNameMessage(
                'Field Category Name exceeds maximum length (30)'
            );
        }
        setDisabledSave(true);
    };

    const onChangeCategoryPrefix = (event) => {
        if (event.target.value.length <= 3) {
            setCategoryPrefixMessage('');
            event.preventDefault();
            setCategoryPrefix(event.target.value);
        } else {
            setCategoryPrefix(event.target.value.substring(0, 3));
            setCategoryPrefixMessage(
                'Field Category Prefix exceeds maximum length (3)'
            );
        }
        setDisabledSave(true);
    };

    const handleAddCategory = async () => {
        await setDisabledSave(false);
        console.log(1);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/category';
            const data = {
                category_name: categoryName.trim(),
                category_prefix: categoryPrefix.toUpperCase(),
            };
            const response = await request.post(endpoint, data, headers);
            handleClickCloseNewCategory();

            setCategoryFirstShow(response.data.data);
        } catch (error) {
            setDisabledSave(true);
            if (error.response.status === 422) {
                setCategoryNameMessage('');
                setCategoryPrefixMessage('');
                if (error.response.data.error.category_name) {
                    categoryNameRef.current.focus();
                    setCategoryNameMessage(
                        error.response.data.error.category_name[0]
                    );
                }
                if (error.response.data.error.category_prefix) {
                    categoryPrefixRef.current.focus();
                    setCategoryPrefixMessage(
                        error.response.data.error.category_prefix[0]
                    );
                }
            }
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/category';
            const res = await request.get(endpoint, headers);
            setCategories(res.data.data);
        };
        fetchCategories();
    }, [createCategorySuccess]);

    return (
        <Container className="container-create">
            <form className="row" onSubmit={handleSubmit(handleAddAsset)}>
                <Row className="box-container">
                    <Col className="title-create-user">
                        <span>Create New Asset</span>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Name</span>
                        <div className="input-form">
                            <input
                                ref={assetNameRef}
                                value={assetName}
                                maxLength={129}
                                className={
                                    showMessage
                                        ? 'input-asset-name error'
                                        : 'input-asset-name'
                                }
                                onChange={onChangeAssetName}
                            />
                            {showMessage && assetNameMessage.length === 0 && (
                                <AlertFieldMessage
                                    message={
                                        'Field Asset Name exceeds maximum length (128)'
                                    }
                                    timeShow={3000}
                                />
                            )}

                            {showMessage && assetNameMessage.length > 0 && (
                                <AlertFieldMessage message={assetNameMessage} />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Category</span>
                        <Dropdown className="category">
                            <Dropdown.Toggle className="category-btn category-create category-toggle">
                                {selectedCategory}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {categories
                                    .filter(
                                        (category) =>
                                            category.category_prefix !==
                                            categoryFirstShow.category_prefix
                                    )
                                    .map((category) => (
                                        <Dropdown.Item
                                            className="category-dropdown-item"
                                            key={category.id}
                                            onClick={() => {
                                                setCategoryId(category.id);
                                                setSelectedCategory(
                                                    category.category_name
                                                );
                                                setDisabledSave(true);
                                            }}
                                        >
                                            {category.category_name}
                                        </Dropdown.Item>
                                    ))}
                                {categoryFirstShow && (
                                    <Dropdown.Item
                                        className="category-dropdown-item"
                                        onClick={() => {
                                            setCategoryId(
                                                categories.length + 1
                                            );
                                            setSelectedCategory(
                                                categoryFirstShow.category_name
                                            );
                                            setDisabledSave(true);
                                        }}
                                    >
                                        {categoryFirstShow.category_name}
                                    </Dropdown.Item>
                                )}

                                {showBtnAddNewCategory && (
                                    <span
                                        className="category-dropdown-item add-new-category dropdown-item"
                                        onClick={() => {
                                            handleClickBtnAddNewCategory();
                                            setCreateCategorySuccess(false);
                                            setDisabledSave(true);
                                        }}
                                    >
                                        Add new category
                                    </span>
                                )}
                                {showAddNewCategory && (
                                    <Row className="create-category box-container">
                                        <Col lg={8} md={8} sm={8} xs={8}>
                                            <input
                                                ref={categoryNameRef}
                                                placeholder="Bluetooth Mouse"
                                                value={categoryName}
                                                maxLength={31}
                                                className={
                                                    categoryNameMessage.length >
                                                    0
                                                        ? 'input-category-name error'
                                                        : 'input-category-name'
                                                }
                                                onChange={(e) => {
                                                    onChangeCategoryName(e);
                                                }}
                                            />
                                            {categoryNameMessage.length > 0 &&
                                                categoryNameMessage ===
                                                    'Field Category Name exceeds maximum length (30)' && (
                                                    <AlertFieldMessage
                                                        message={
                                                            categoryNameMessage
                                                        }
                                                        timeShow={3000}
                                                    />
                                                )}
                                            {categoryNameMessage.length > 0 &&
                                                categoryNameMessage !==
                                                    'Field Category Name exceeds maximum length (30)' && (
                                                    <AlertFieldMessage
                                                        message={
                                                            categoryNameMessage
                                                        }
                                                    />
                                                )}
                                        </Col>
                                        <Col lg={2} md={2} sm={2} xs={2}>
                                            <input
                                                ref={categoryPrefixRef}
                                                placeholder="BM"
                                                value={categoryPrefix}
                                                maxLength={4}
                                                className={
                                                    categoryPrefixMessage.length >
                                                    0
                                                        ? 'error'
                                                        : ''
                                                }
                                                onChange={(e) => {
                                                    onChangeCategoryPrefix(e);
                                                }}
                                            />
                                            {categoryPrefixMessage.length > 0 &&
                                                categoryPrefixMessage ===
                                                    'Field Category Prefix exceeds maximum length (3)' && (
                                                    <AlertFieldMessage
                                                        message={
                                                            categoryPrefixMessage
                                                        }
                                                        timeShow={3000}
                                                    />
                                                )}
                                            {categoryPrefixMessage.length > 0 &&
                                                categoryPrefixMessage !==
                                                    'Field Category Prefix exceeds maximum length (3)' && (
                                                    <AlertFieldMessage
                                                        message={
                                                            categoryPrefixMessage
                                                        }
                                                    />
                                                )}
                                        </Col>
                                        <Col lg={2} md={2} sm={2} xs={2}>
                                            <Button
                                                className="btn-save-create"
                                                disabled={
                                                    (categoryName === '' ||
                                                        categoryPrefix === '' ||
                                                        '' ||
                                                        !disabledSave) &&
                                                    true
                                                }
                                                onClick={() => {
                                                    handleAddCategory();
                                                    setCreateCategorySuccess(
                                                        true
                                                    );
                                                }}
                                            >
                                                <TiTick />
                                            </Button>
                                            <Button
                                                className="btn-close-create"
                                                onClick={
                                                    handleClickCloseNewCategory
                                                }
                                            >
                                                <GrFormClose />
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Specification</span>
                        <div className="input-form">
                            <textarea
                                maxLength={257}
                                ref={assetSpecificationRef}
                                value={assetSpecification}
                                onChange={onChangeAssetSpecification}
                                className={
                                    assetSpecificationMessage.length > 0
                                        ? 'textarea-specification error'
                                        : 'textarea-specification'
                                }
                            />
                            {showSpecificationMessage && (
                                <AlertFieldMessage
                                    message={
                                        'Field Specification exceeds maximum length (256)'
                                    }
                                    timeShow={3000}
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Installed Date</span>
                        <div className="input-form">
                            <div className="flex-date">
                                <DatePicker
                                    max="2122-12-31"
                                    min="1900-01-01"
                                    showMonthDropdown
                                    showYearDropdown
                                    defaultValue={assetInstalledDate}
                                    todayButton={'Today'}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat={'dd/MM/yyyy'}
                                    selected={assetInstalledDate}
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
                                            max="2122-12-31"
                                            min="1900-01-01"
                                        />
                                    }
                                    onChange={(assetInstalledDate) => {
                                        setAssetInstalledDate(
                                            assetInstalledDate
                                        );
                                        setDisabledSave(true);
                                    }}
                                    className="input-installed-date"
                                />
                                <BsCalendar2DateFill />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-asset">
                        <span className="state-asset">State</span>
                        <div className="form-check-state-asset">
                            <div>
                                <Form.Check
                                    label="Available"
                                    inline
                                    name="state"
                                    type="radio"
                                    value={1}
                                    checked={parseInt(statusId) === 1}
                                    onChange={handleClickState}
                                />
                            </div>
                            <div>
                                <Form.Check
                                    label="Not Available"
                                    inline
                                    name="state"
                                    type="radio"
                                    value={2}
                                    checked={parseInt(statusId) === 2}
                                    onChange={handleClickState}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="box-container" xs="auto">
                    <Col className="box-button">
                        <button
                            className="btn-cancel"
                            onClick={() => navigate('/manage-asset')}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-save"
                            disabled={
                                (assetName === '' ||
                                    selectedCategory === '' ||
                                    assetSpecification === '' ||
                                    assetInstalledDate === '' ||
                                    statusId === '' ||
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
};

export default AddAsset;
