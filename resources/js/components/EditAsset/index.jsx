import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import swal from 'sweetalert';
import * as request from '../../utils/request';
import { useDispatch } from 'react-redux';
import { setFirstShowAsset } from '../../Actions/userActions';
import AlertFieldMessage from '../AlertFiledMessage';
import ConfirmModal from '../ConfirmModal';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { AiFillWarning } from 'react-icons/ai';
import './style.scss';

function EditAsset() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { id } = useParams();

    const dispatch = useDispatch();

    const [asset, setAsset] = useState({});

    const navigate = useNavigate();
    const [assetName, setAssetName] = useState('');
    const [category, setCategory] = useState('');
    const [specification, setSpecification] = useState('');
    const [installedDate, setInstalledDate] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showSpecificationMessage, setShowSpecificationMessage] =
        useState(false);
    const [disabledSave, setDisabledSave] = useState(false);
    const [state, setSate] = useState({});
    const [checkState, setCheckState] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [changeSpecification, setChangeSpecification] = useState(false);
    const [changeInstalledDate, setChangeInstalledDate] = useState(false);
    const [changeState, setChangeState] = useState(false);
    const [assetAssignment, setAssetAssignment] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showReturn, setShowReturn] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const infoShow = {
        title: 'Are you sure?',
        detail: 'This action will cancel the current assignment. Do you want to continue to edit this asset?',
        contentBtn: 'Continue',
        cancelBtn: 'Cancel',
    };

    const showModal = () => {
        setShowReturn(true);
    };

    const handleCancel = (show) => {
        setShowReturn(show);
        setConfirm(false);
        setDisabledSave(true);
    };

    const handleConfirm = async () => {
        setShowReturn(false);
        console.log('in');
        console.log(confirm);
        handleUpdate();
    };
    useEffect(() => {
        const fetchAssetDetail = async () => {
            try {
                const location_id = JSON.parse(
                    localStorage.getItem('location')
                ).id;
                const token = JSON.parse(localStorage.getItem('token'));
                const headers = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const endpoint = `/asset-by-id?id=${id}`;
                const res = await request.get(endpoint, headers);
                if (
                    res.data.data.status_id === 3 ||
                    res.data.data.location !== location_id
                ) {
                    handleRedirect();
                } else {
                    setAsset(res.data.data);
                    setAssetName(res.data.data.asset_name);
                    setCategory(res.data.data.category.category_name);
                    setSpecification(res.data.data.asset_specification);
                    setInstalledDate(res.data.data.asset_installed_date);
                    setCheckState(res.data.data.status_id);
                    fetchAssetAssignment();
                }
            } catch (error) {
                console.log(error.response.data.error);
                handleRedirect();
            }
        };
        fetchAssetDetail();
    }, [id]);

    const handleRedirect = () => {
        const path = '/*';
        navigate(path);
    };

    useEffect(() => {
        const fetchState = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/asset-status';
            const res = await request.get(endpoint, headers);
            setSate(res.data);
        };
        fetchState();
    }, []);

    const handleUpdate = async () => {
        await setDisabledSave(false);
        try {
            if (!confirm && showAlert) {
                setConfirm(true);
                showModal();
            } else {
                const data = {
                    id,
                    asset_name: assetName,
                    status: checkState,
                    asset_specification: specification,
                    asset_installed_date: moment(
                        new Date(installedDate)
                    ).format('YYYY-MM-DD'),
                };
                const token = JSON.parse(localStorage.getItem('token'));
                const headers = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                let endpoint = `/asset`;
                if (showAlert) {
                    endpoint = `/asset?warning=1`;
                }
                const response = await request.patch(endpoint, data, headers);
                console.log(response.data.data);
                dispatch(setFirstShowAsset({ data: response.data.data }));
                swal({
                    text: 'Update asset successfully!',
                    dangerMode: true,
                }).then(() => {
                    const path = '/manage-asset';
                    navigate(path);
                });
            }
        } catch (error) {
            setDisabledSave(true);
        }
    };

    const fetchAssetAssignment = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const endpoint = `/asset-check-has-assignment?asset_id=${id}`;
            const res = await request.get(endpoint, headers);
            console.log(res.data.data);
            setAssetAssignment(res.data.data);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    const onAssetName = (event) => {
        if (event.target.value.length <= 128) {
            setShowMessage(false);
            event.preventDefault();
            setAssetName(event.target.value);
            if (
                (event.target.value === asset.asset_name ||
                    event.target.value.length === 0) &&
                !changeSpecification &&
                !changeInstalledDate &&
                !changeState
            ) {
                setChangeName(false);
                setDisabledSave(false);
            } else if (
                event.target.value === asset.asset_name ||
                event.target.value.length === 0
            ) {
                setChangeName(false);
                setDisabledSave(true);
            } else {
                setChangeName(true);
                setDisabledSave(true);
            }
        } else {
            setAssetName(event.target.value.substring(0, 128));
            setShowMessage(true);
            if (
                event.target.value === asset.asset_name &&
                !changeSpecification &&
                !changeInstalledDate &&
                !changeState
            ) {
                setChangeName(false);
                setDisabledSave(false);
            } else if (event.target.value === asset.asset_name) {
                setChangeName(false);
                setDisabledSave(true);
            } else {
                setChangeName(true);
                setDisabledSave(true);
            }
        }
    };

    const onSpecification = (event) => {
        event.preventDefault();
        if (event.target.value.length <= 256) {
            setSpecification(event.target.value);
            setShowSpecificationMessage(false);
        } else {
            setSpecification(event.target.value.substring(0, 256));
            setShowSpecificationMessage(true);
        }
        if (
            (event.target.value === asset.asset_specification ||
                event.target.value.length === 0) &&
            !changeName &&
            !changeInstalledDate &&
            !changeState
        ) {
            setChangeSpecification(false);
            setDisabledSave(false);
        } else if (
            event.target.value === asset.asset_specification ||
            event.target.value.length === 0
        ) {
            setChangeSpecification(false);
            setDisabledSave(true);
        } else {
            setChangeSpecification(true);
            setDisabledSave(true);
            console.log('change');
        }
    };

    const handleChangeInstallDate = (installedDate) => {
        setInstalledDate(installedDate);
        if (
            moment(new Date(installedDate)).format('YYYY-MM-DD') ===
                asset.asset_installed_date &&
            !changeName &&
            !changeSpecification &&
            !changeState
        ) {
            setChangeInstalledDate(false);
            setDisabledSave(false);
        } else if (
            moment(new Date(installedDate)).format('YYYY-MM-DD') ===
            asset.asset_installed_date
        ) {
            setChangeInstalledDate(false);
            setDisabledSave(true);
        } else {
            setChangeInstalledDate(true);
            setDisabledSave(true);
        }
    };

    const handleChangeState = (id) => {
        setCheckState(id);
        if (
            id === asset.status_id &&
            !changeName &&
            !changeSpecification &&
            !changeInstalledDate
        ) {
            setChangeState(false);
            setDisabledSave(false);
            setShowAlert(false);
        } else if (id === asset.status_id) {
            setChangeState(false);
            setDisabledSave(true);
            setShowAlert(false);
        } else {
            setChangeState(true);
            setDisabledSave(true);
            if (asset.status_id === 1) {
                console.log(assetAssignment);
                console.log(id);
                if (assetAssignment.length > 0 && id !== asset.status_id) {
                    setShowAlert(true);
                }
            } else {
                setShowAlert(false);
            }
        }
    };

    return (
        <Container className="container-edit">
            <form className="row" onSubmit={handleSubmit(handleUpdate)}>
                <Row className="box-container">
                    <Col className="title-edit-user">
                        <span>Edit Asset</span>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Name</span>
                        <div className="input-form">
                            <input
                                placeholder="Name"
                                value={assetName}
                                maxLength={129}
                                {...register('name', {
                                    pattern: /^[a-zA-Z0-9 ]*$/,
                                })}
                                className={
                                    showMessage ||
                                    errors?.name?.type === 'pattern'
                                        ? 'error'
                                        : ''
                                }
                                onChange={onAssetName}
                            />
                            {showMessage && (
                                <AlertFieldMessage
                                    message={
                                        'Field Asset Name exceeds maximum length (128)'
                                    }
                                    timeShow={3000}
                                />
                            )}
                            {errors?.name?.type === 'pattern' && (
                                <AlertFieldMessage
                                    message={
                                        'Specification character is NOT allowed'
                                    }
                                />
                            )}

                            {errors?.name?.type === 'required' && (
                                <AlertFieldMessage
                                    message={'This field is required'}
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Category</span>
                        <div className="input-form">
                            <Dropdown className="category">
                                <Dropdown.Toggle
                                    className="category-btn category-edit category-toggle"
                                    disabled
                                >
                                    {category}
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Specification</span>
                        <div className="input-form">
                            <textarea
                                maxLength={257}
                                placeholder="Specification"
                                value={specification}
                                onChange={onSpecification}
                                // {...register('specification', {
                                //     pattern: /^[a-zA-Z0-9,. ]+(\.|\n)*$/,
                                // })}
                                // // className={
                                // //     errors?.specification?.type === 'pattern' &&
                                // //     'error'
                                // // }
                            />
                            {showSpecificationMessage && (
                                <AlertFieldMessage
                                    message={
                                        'Field Specification exceeds maximum length (256)'
                                    }
                                    timeShow={3000}
                                />
                            )}
                            {/* {errors?.specification?.type === 'pattern' && (
                                <AlertFieldMessage
                                    message={
                                        'Specification character is NOT allowed'
                                    }
                                />
                            )} */}
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-control">
                        <span>Installed Date</span>
                        <div className="input-form">
                            <div className="flex-date">
                                <DatePicker
                                    todayButton={'Today'}
                                    placeholderText="DD/MM/YYYY"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat={'dd/MM/yyyy'}
                                    value={moment(installedDate).format(
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
                                    onChange={(installedDate) =>
                                        handleChangeInstallDate(installedDate)
                                    }
                                />
                                <BsCalendar2DateFill />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="box-container">
                    <Col className="box-asset">
                        <span className="title-asset">State</span>
                        <div>
                            {state.data &&
                                state.data
                                    .filter(
                                        (statess) =>
                                            statess.asset_status_name !==
                                            'Assigned'
                                    )
                                    .map((st) => {
                                        return (
                                            <div key={st.id}>
                                                <Form.Check
                                                    inline
                                                    className="checkbox-state-radio-asset"
                                                    label={st.asset_status_name}
                                                    type="radio"
                                                    name={checkState}
                                                    checked={
                                                        checkState === st.id
                                                    }
                                                    value={st.id}
                                                    onClick={() =>
                                                        handleChangeState(st.id)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                    </Col>
                    {showAlert && (
                        <div className="warning-message">
                            <label>
                                <AiFillWarning></AiFillWarning>
                                <span className="span-bold">Warning:</span>
                                <span className="span-light">
                                    Asset already belongs to an assignment
                                </span>
                            </label>
                        </div>
                    )}
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
                                    specification === '' ||
                                    !disabledSave) &&
                                true
                            }
                        >
                            Save
                        </button>
                    </Col>
                </Row>
            </form>
            <ConfirmModal
                info={infoShow}
                showModal={showReturn}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </Container>
    );
}

export default EditAsset;
