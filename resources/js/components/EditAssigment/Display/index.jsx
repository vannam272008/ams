import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as request from '../../../utils/request';
import { AiOutlineSearch } from 'react-icons/ai';
import SelectTable from '../SelectTable/SelectTable';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
    setUserAssignment,
    setAssetAssignment,
    setFirstShowAssignment,
} from '../../../Actions/userActions';
import DatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs';
import './style.scss';

function EditAssigment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [table, setTable] = useState();
    const [assignment, setAssignment] = useState({});
    const [idUserCheck, setIdUserCheck] = useState('');
    const [idAssetCheck, setIdAssetCheck] = useState('');
    const [assignedDate, setAssignedDate] = useState('');
    const [note, setNote] = useState('');
    const userCheck = useSelector((state) => state.user.showUserAssignment);
    const assetCheck = useSelector((state) => state.user.showAssetAssignment);
    const [showUserCheck, setShowUserCheck] = useState(userCheck.fullName);
    const [assetNameCheck, setAssetNameCheck] = useState(assetCheck.assetName);
    const { handleSubmit } = useForm();
    const [disabledSave, setDisabledSave] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [changeUser, setChangeUser] = useState(false);
    const [changeAsset, setChangeAsset] = useState(false);
    const [changeAssignedDate, setChangeAssignedDate] = useState(false);
    const [changeNote, setChangeNote] = useState(false);

    const handleUpdate = async () => {};
    useEffect(() => {
        setShowUserCheck(userCheck.fullName);
    }, [userCheck]);

    useEffect(() => {
        setAssetNameCheck(assetCheck.assetName);
    }, [assetCheck]);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const location_id = JSON.parse(
                    localStorage.getItem('location')
                ).id;
                const token = JSON.parse(localStorage.getItem('token'));
                const headers = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const res = await request.get(`/assignment/${id}`, headers);
                setAssignment(res.data.data);
                setShowUserCheck(res.data.data.assigned_to);
                setAssetNameCheck(res.data.data.asset_name);
                setAssignedDate(res.data.data.assigned_date);
                setNote(res.data.data.note);
                setIdAssetCheck(res.data.data.asset_id);
                setIdUserCheck(res.data.data.assigned_to_id);

                if (
                    res.data.data.state === 'Accepted' ||
                    res.data.data.location_id !== location_id
                ) {
                    handleRedirect();
                } else {
                    setAssignment(res.data.data);
                    setShowUserCheck(res.data.data.assigned_to);
                    setAssetNameCheck(res.data.data.asset_name);
                    setAssignedDate(res.data.data.assigned_date);
                    setNote(res.data.data.note);
                    setIdAssetCheck(res.data.data.asset_id);
                    setIdUserCheck(res.data.data.assigned_to_id);
                }
            } catch (error) {
                handleRedirect();
                console.log(error.response.data.error);
            }
        };
        fetchAssignment();
    }, [id]);

    const handleRedirect = () => {
        const path = '/*';
        navigate(path);
    };

    const handleShow = async (value) => {
        if (!isShow) await setIsShow(true);
        else {
            await setIsShow(false);
            await setIsShow(true);
        }
        await setTable(value);
    };

    const handleCancel = () => {
        dispatch(setUserAssignment(0, ''));
        dispatch(setAssetAssignment(0, ''));
        navigate('/manage-assignment');
    };
    const handleEdit = async () => {
        try {
            let data = {};
            if (note === '') {
                data = {
                    id,
                    asset_id: idAssetCheck,
                    assignment_to: idUserCheck,
                    assignment_date_assigned: moment(
                        new Date(assignedDate)
                    ).format('YYYY-MM-DD'),
                };
            } else {
                data = {
                    id,
                    asset_id: idAssetCheck,
                    assignment_to: idUserCheck,
                    assignment_date_assigned: moment(
                        new Date(assignedDate)
                    ).format('YYYY-MM-DD'),
                    assignment_note: note,
                };
            }
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const endpoint = `/update-assignment`;
            const response = await request.patch(endpoint, data, headers);
            dispatch(setFirstShowAssignment({ data: response.data.data }));
            dispatch(setUserAssignment(0, ''));
            dispatch(setAssetAssignment(0, ''));
            swal('Edit assignment successfully').then(() => {});
            swal({
                text: 'Edit assignment successfully!',
                dangerMode: true,
            }).then(() => {
                const path = '/manage-assignment';
                navigate(path);
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    const onDate = (ad) => {
        setAssignedDate(ad);
        if (
            moment(new Date(ad)).format('YYYY-MM-DD') ===
                assignment.assigned_date &&
            !changeUser &&
            !changeAsset &&
            !changeNote
        ) {
            setChangeAssignedDate(false);
            setDisabledSave(false);
        } else if (
            moment(new Date(ad)).format('YYYY-MM-DD') ===
            assignment.assigned_date
        ) {
            setChangeAssignedDate(false);
            setDisabledSave(true);
        } else {
            setChangeAssignedDate(true);
            setDisabledSave(true);
        }
    };

    const onNote = (event) => {
        event.preventDefault();
        setNote(event.target.value);
        if (
            event.target.value === assignment.note &&
            !changeUser &&
            !changeAsset &&
            !changeAssignedDate
        ) {
            setChangeNote(false);
            setDisabledSave(false);
        } else if (event.target.value === assignment.note) {
            setChangeNote(false);
            setDisabledSave(true);
        } else {
            setChangeNote(true);
            setDisabledSave(true);
        }
    };

    const handleChangeUser = (id) => {
        setIdUserCheck(id);
        if (
            id === assignment.assigned_to_id &&
            !changeNote &&
            !changeAsset &&
            !changeAssignedDate
        ) {
            setChangeUser(false);
            setDisabledSave(false);
        } else if (id === assignment.assigned_to_id) {
            setChangeUser(false);
            setDisabledSave(true);
        } else {
            setChangeUser(true);
            setDisabledSave(true);
        }
    };

    const handleChangeAsset = (id) => {
        setIdAssetCheck(id);
        if (
            id === assignment.asset_id &&
            !changeNote &&
            !changeUser &&
            !changeAssignedDate
        ) {
            setChangeAsset(false);
            setDisabledSave(false);
        } else if (id === assignment.asset_id) {
            setChangeAsset(false);
            setDisabledSave(true);
        } else {
            setChangeAsset(true);
            setDisabledSave(true);
        }
    };

    return (
        <>
            <SelectTable
                show={isShow}
                table={table}
                idAssetCheck={idAssetCheck}
                idUserCheck={idUserCheck}
                onHide={() => setIsShow(false)}
                onChangeUser={handleChangeUser}
                onChangeAsset={handleChangeAsset}
            />
            <Container className="container-edit">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Row className="box-container">
                        <Col className="title-edit-user">
                            <span>Edit Assignment</span>
                        </Col>
                    </Row>
                    <Row className="box-container">
                        <Col className="box-control">
                            <span>User</span>
                            <input
                                type={'submit'}
                                value={showUserCheck}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleShow(1)}
                                maxLength="0"
                            />
                            <AiOutlineSearch
                                onClick={() => handleShow(1)}
                                className="icon-search"
                            />
                        </Col>
                    </Row>

                    <Row className="box-container">
                        <Col className="box-control">
                            <span>Asset</span>
                            <input
                                type={'submit'}
                                value={assetNameCheck}
                                style={{ cursor: 'pointer', textAlign: 'left' }}
                                onClick={() => handleShow(0)}
                                maxLength="0"
                            />
                            <AiOutlineSearch
                                onClick={() => handleShow(0)}
                                className="icon-search"
                            />
                        </Col>
                    </Row>

                    <Row className="box-container">
                        <Col className="box-control">
                            <span>Assigned Date</span>
                            <div className="input-form">
                                <div className="flex-date-asm">
                                    <DatePicker
                                        minDate={new Date()}
                                        todayButton={'Today'}
                                        showMonthDropdown
                                        showYearDropdown
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat={'dd/MM/yyyy'}
                                        value={moment(assignedDate).format(
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
                                        onChange={(assignedDate) => {
                                            onDate(assignedDate);
                                        }}
                                    />
                                    <BsCalendar2DateFill />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="box-container">
                        <Col className="box-control">
                            <span>Note (optional)</span>
                            <textarea
                                maxLength={257}
                                className={
                                    note.length > 256
                                        ? 'text-note error'
                                        : 'text-note'
                                }
                                value={note}
                                onChange={onNote}
                            />
                        </Col>
                        {note.length > 256 && (
                            <label>Field Note exceeds maximum length 256</label>
                        )}
                    </Row>
                    <Row className="box-container" xs="auto">
                        <Col className="box-button">
                            <button
                                className="btn-cancel"
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-save"
                                disabled={
                                    note.length > 256 || (!disabledSave && true)
                                }
                                onClick={() => handleEdit()}
                            >
                                Save
                            </button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    );
}

export default EditAssigment;
