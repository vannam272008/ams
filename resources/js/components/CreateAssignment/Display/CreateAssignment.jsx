import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

import './CreateAssignment.scss';

function CreateAssignment() {
    const dispatch = useDispatch();
    const { handleSubmit } = useForm();
    const navigate = useNavigate();
    // const joinedInput = useRef();
    const [isShow, setIsShow] = useState(false);
    const [table, setTable] = useState();
    const userCheck = useSelector((state) => state.user.showUserAssignment);
    const assetCheck = useSelector((state) => state.user.showAssetAssignment);
    const [showUserCheck, setShowUserCheck] = useState(userCheck.fullName);
    const [idUserCheck, setIdUserCheck] = useState('');
    const [assetNameCheck, setAssetNameCheck] = useState(assetCheck.assetName);
    const [idAssetCheck, setIdAssetCheck] = useState('');
    const [assignedDate, setAssignedDate] = useState('');
    const [note, setNote] = useState('');
    const [disabledSave, setDisabledSave] = useState(false);

    const handleUpdate = async () => {};
    useEffect(() => {
        dispatch(setUserAssignment(0, ''));
        dispatch(setAssetAssignment(0, ''));
    }, []);
    useEffect(() => {
        setShowUserCheck(userCheck.fullName);
        setIdUserCheck(userCheck.id);
    }, [userCheck]);
    useEffect(() => {
        setAssetNameCheck(assetCheck.assetName);
        setIdAssetCheck(assetCheck.id);
    }, [assetCheck]);
    const handleShow = async (value) => {
        if (!isShow) await setIsShow(true);
        else {
            await setIsShow(false);
            await setIsShow(true);
        }
        await setTable(value);
        setDisabledSave(true);
    };
    const handleNote = (e) => {
        e.preventDefault();
        setNote(e.target.value);
        setDisabledSave(true);
    };
    const handleCancel = () => {
        dispatch(setUserAssignment(0, ''));
        dispatch(setAssetAssignment(0, ''));
        navigate('/manage-assignment');
    };
    const handleCreate = async () => {
        await setDisabledSave(false);
        try {
            let data;
            if (note === '') {
                data = {
                    asset_id: idAssetCheck,
                    assignment_to: idUserCheck,
                    assignment_date_assigned: moment(
                        new Date(assignedDate)
                    ).format('YYYY-MM-DD'),
                };
            } else {
                data = {
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
            const endpoint = `/assignment`;
            const response = await request.post(endpoint, data, headers);
            console.log(response.data);
            dispatch(setFirstShowAssignment({ data: response.data }));
            swal('Created assignment successfully').then(() => {});
            swal({
                text: 'Created assignment successfully!',
                dangerMode: true,
            }).then(() => {
                const path = '/manage-assignment';
                navigate(path);
            });
        } catch (error) {
            setDisabledSave(true);
            console.log(error.response);
        }
    };

    return (
        <>
            <SelectTable
                show={isShow}
                table={table}
                onHide={() => setIsShow(false)}
            />
            <Container className="container-edit">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Row className="box-container">
                        <Col className="title-edit-user">
                            <span>Create New Assignment</span>
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
                                        // maxDate="2122-12-31"
                                        minDate={new Date()}
                                        showMonthDropdown
                                        showYearDropdown
                                        todayButton={'Today'}
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat={'dd/MM/yyyy'}
                                        selected={assignedDate}
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
                                            setAssignedDate(assignedDate);
                                            setDisabledSave(true);
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
                                onChange={handleNote}
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
                                    (idUserCheck === 0 ||
                                        idAssetCheck === 0 ||
                                        note.length > 256 ||
                                        assignedDate === '' ||
                                        !disabledSave) &&
                                    true
                                }
                                onClick={() => handleCreate()}
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

export default CreateAssignment;
