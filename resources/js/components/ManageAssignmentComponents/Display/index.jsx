import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import DetailAssignment from '../DetailAssignment';
import { useDispatch, useSelector } from 'react-redux';
import {
    changePage,
    setSortAssignment,
    setDefaultFirstRecord,
    setFirstShowAssignment,
} from '../../../Actions/userActions';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import AlertMessage from '../../AlertMessage/AlertMessage';
import HoverItem from '../../HoverItem';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { SlReload } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../ConfirmModal';
import swal from 'sweetalert';
import * as request from '../../../utils/request';

const Display = (props) => {
    const [showDetail, setShowDetail] = useState(false);
    const [assignmentDetail, setAssignmentDetail] = useState([]);
    const assignmentList = useSelector((state) => state.user.assignmentList);
    const sortAssignment = useSelector((state) => state.user.sortAssignment);
    const assignmentFirstShow = useSelector(
        (state) => state.user.assignmentFirstShow
    );
    const [assignmentFirst, setAssignmentFirst] = useState({});
    const [assignmentChange, setAssignmentChange] = useState({});
    const [sortColumn, setSortColumn] = useState(sortAssignment.sortColumn);
    const [sortType, setSortType] = useState(sortAssignment.sortType);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showReturn, setShowReturn] = useState(false);
    const [typeChange, setTypeChange] = useState('');
    const [infoShow, setInfoShow] = useState({});
    const [disableReturn, setDisableReturn] = useState(false);

    useEffect(() => {
        setAssignmentFirst(assignmentFirstShow);
    }, [assignmentFirstShow]);

    const getClassNameHoverItem = (content, contentCut) => {
        if (content === contentCut) {
            return 'not-hover-item';
        } else {
            return 'hover-item';
        }
    };

    const handleClickSort = (sortName) => {
        if (sortColumn !== sortName) {
            setSortColumn(sortName);
            setSortType(2);
            dispatch(setSortAssignment(sortName, 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSortAssignment(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSortAssignment(sortColumn, 2));
            }
        }
        setAssignmentFirst({});
        props.setCurrentPage(1);
    };

    const handleShow = () => {
        setShowDetail(true);
    };

    const handleClose = () => {
        setShowDetail(false);
    };

    const handleRedirect = (id) => {
        props.setSuccessLoading(false);
        const path = `/manage-assignment/edit/${id}`;
        navigate(path);
    };

    const getTextWidth = (text, font) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.font = font || getComputedStyle(document.body).font;

        return context.measureText(text).width;
    };

    const getTextAfterCut = (text, id) => {
        const maxWidth =
            document.getElementById(id) &&
            document.getElementById(id).offsetWidth;
        if (getTextWidth(text) >= maxWidth - 20) {
            const words = text && text.split(' ');
            let newText = '';
            let tempText = '';
            words &&
                words.forEach((word) => {
                    tempText = tempText + word;
                    if (
                        getTextWidth(tempText) <
                        maxWidth - getTextWidth('...') - 20
                    ) {
                        newText = tempText;
                        tempText = tempText + ' ';
                    }
                });
            return newText + '...';
        } else {
            return text;
        }
    };

    // Action Button ----------------------
    const handleShowModal = (type, assignment) => {
        if (type === 'return') {
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to create a returning request for this asset?',
                contentBtn: 'Yes',
                cancelBtn: 'No',
            });
        } else if (type === 'accept') {
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to accept this assignment?',
                contentBtn: 'Accept',
                cancelBtn: 'Cancel',
            });
        } else if (type === 'decline') {
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to delete this assignment?',
                contentBtn: 'Delete',
                cancelBtn: 'Cancel',
            });
        }
        showModal();
        setTypeChange(type);
        setAssignmentChange(assignment);
    };

    const showModal = () => {
        setShowReturn(true);
    };

    const handleCancel = (show) => {
        setShowReturn(show);
    };

    const handleConfirm = async () => {
        setShowReturn(false);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            if (typeChange === 'return') {
                const data = {
                    assignment_id: assignmentChange.id,
                };
                console.log(data);
                const endpoint = `/request-for-returning?assignment_id=${assignmentChange.id}`;
                const response = await request.post(endpoint, data, headers);
                swal({
                    text: 'Create a returning request successfully!',
                    dangerMode: true,
                });
                dispatch(setFirstShowAssignment({ data: response.data.data }));
                setDisableReturn(true);
            } else {
                const data = {
                    assignment_id: assignmentChange.id,
                };
                const endpoint = 'assignment/delete';
                await request.remove(endpoint, data, headers);
                dispatch(setDefaultFirstRecord());
                dispatch(changePage(props.currentPage));
                swal({
                    text: `Delete assignment successfully!`,
                    dangerMode: true,
                });
            }
        } catch (error) {
            swal({
                text: 'Action assignment error!',
                dangerMode: true,
            });
        }
    };

    return (
        <div className="scroll-assignment">
            <div className="list-assignment">
                <Row>
                    <Col xs={'0-75'}>
                        <div className="field">
                            <Button
                                className="btn-field no-sort"
                                variant="danger"
                                disabled
                            >
                                <span>
                                    <b>No.</b>
                                </span>
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('asset_code')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Asset Code</b>
                                </span>
                                {sortColumn === 'asset_code' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'asset_code' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={2}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('asset_name')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Asset Name</b>
                                </span>
                                {sortColumn === 'asset_name' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'asset_name' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('assigned_to')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Assigned to</b>
                                </span>
                                {sortColumn === 'assigned_to' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'assigned_to' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('assigned_by')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Assigned by</b>
                                </span>
                                {sortColumn === 'assigned_by' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'assigned_by' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('assigned_date')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Assigned Date</b>
                                </span>
                                {sortColumn === 'assigned_date' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'assigned_date' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'2-25'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('state')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>State</b>
                                </span>
                                {sortColumn === 'state' && sortType === 2 && (
                                    <FaCaretDown />
                                )}
                                {sortColumn === 'state' && sortType === 1 && (
                                    <FaCaretUp />
                                )}
                            </Button>
                        </div>
                    </Col>
                </Row>
                {assignmentList && assignmentList.length === 0 && (
                    <AlertMessage
                        variant="danger"
                        message="Assignment cannot be found"
                    />
                )}

                {assignmentFirst.id && (
                    <Row className="row-user-list">
                        <Col
                            xs={'0-75'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>1</span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>{assignmentFirst.asset_code}</span>
                        </Col>
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                            className={getClassNameHoverItem(
                                assignmentFirst.asset_name,
                                getTextAfterCut(
                                    assignmentFirst.asset_name,
                                    'assignment_first_asset_name'
                                )
                            )}
                            id={'assignment_first_asset_name'}
                            data-hover={assignmentFirst.asset_name}
                        >
                            <HoverItem
                                content={assignmentFirst.asset_name}
                                contentCut={getTextAfterCut(
                                    assignmentFirst.asset_name,
                                    'assignment_first_asset_name'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>{assignmentFirst.assigned_to}</span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>{assignmentFirst.assigned_by}</span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>
                                {moment(assignmentFirst.assigned_date).format(
                                    'DD/MM/YYYY'
                                )}
                            </span>
                        </Col>
                        <Col
                            xs={'2-25'}
                            onClick={() => {
                                handleShow();
                                setAssignmentDetail(assignmentFirst);
                            }}
                        >
                            <span>{assignmentFirst.state}</span>
                        </Col>
                        <Col className="edit-delete-return" xs={1}>
                            <Button
                                variant="danger"
                                className="btn-edit"
                                onClick={() => {
                                    handleRedirect(assignmentFirst.id);
                                    handleShowModal('accept', assignmentFirst);
                                }}
                                disabled={
                                    assignmentFirst.state !==
                                    'Waiting for acceptance'
                                }
                            >
                                <MdOutlineModeEditOutline />
                            </Button>
                            <Button
                                className="btn-delete"
                                variant="danger"
                                disabled={assignmentFirst.state === 'Accepted'}
                                onClick={() =>
                                    handleShowModal('decline', assignmentFirst)
                                }
                            >
                                <AiOutlineCloseCircle />
                            </Button>
                            <Button
                                className="btn-return"
                                variant="danger"
                                onClick={() =>
                                    handleShowModal('return', assignmentFirst)
                                }
                                disabled={
                                    assignmentFirst.state ===
                                        'Waiting for acceptance' ||
                                    assignmentFirst.state === 'Declined' ||
                                    assignmentFirst.state === 'Canceled' ||
                                    assignmentFirst.has_request === true ||
                                    disableReturn
                                }
                            >
                                <SlReload />
                            </Button>
                        </Col>
                    </Row>
                )}

                {(assignmentList.find(
                    (assignment) => assignment.id === assignmentFirst.id
                ) === undefined && assignmentFirst.id
                    ? assignmentList.slice(0, 19)
                    : assignmentList.filter(
                          (assignment) => assignment.id !== assignmentFirst.id
                      )
                ).map((assignment, index) => {
                    return (
                        <Row key={index} className="row-user-list">
                            <Col
                                xs={'0-75'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>
                                    {assignmentFirst.id
                                        ? index +
                                          2 +
                                          sortAssignment.page * 20 -
                                          20
                                        : index +
                                          1 +
                                          sortAssignment.page * 20 -
                                          20}
                                </span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{assignment.asset_code}</span>
                            </Col>
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                                className={getClassNameHoverItem(
                                    assignment.asset_name,
                                    getTextAfterCut(
                                        assignment.asset_name,
                                        'assignment_asset_name'
                                    )
                                )}
                                id={'assignment_asset_name'}
                                data-hover={assignment.asset_name}
                            >
                                <HoverItem
                                    content={assignment.asset_name}
                                    contentCut={getTextAfterCut(
                                        assignment.asset_name,
                                        'assignment_asset_name'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{assignment.assigned_to}</span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{assignment.assigned_by}</span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>
                                    {moment(assignment.assigned_date).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                            </Col>
                            <Col
                                xs={'2-25'}
                                onClick={() => {
                                    handleShow();
                                    setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{assignment.state}</span>
                            </Col>
                            <Col className="edit-delete-return" xs={1}>
                                <Button
                                    variant="danger"
                                    className="btn-edit"
                                    onClick={() => {
                                        handleRedirect(assignment.id);
                                        handleShowModal('accept', assignment);
                                    }}
                                    disabled={
                                        // assignment.state === 'Accepted' ||
                                        // assignment.state === 'Declined' ||
                                        // moment(
                                        //     new Date(assignment.assigned_date)
                                        // ).format('l') < moment().format('l')
                                        assignment.state !==
                                        'Waiting for acceptance'
                                        // moment(
                                        //     new Date(assignment.assigned_date)
                                        // ).format('l') < moment().format('l')
                                    }
                                >
                                    <MdOutlineModeEditOutline />
                                </Button>
                                <Button
                                    className="btn-delete"
                                    variant="danger"
                                    disabled={assignment.state === 'Accepted'}
                                    onClick={() =>
                                        handleShowModal('decline', assignment)
                                    }
                                >
                                    <AiOutlineCloseCircle />
                                </Button>
                                <Button
                                    className="btn-return"
                                    variant="danger"
                                    disabled={
                                        assignment.state ===
                                            'Waiting for acceptance' ||
                                        assignment.state === 'Declined' ||
                                        assignment.state === 'Canceled' ||
                                        assignment.has_request === true ||
                                        disableReturn
                                    }
                                    onClick={() =>
                                        handleShowModal('return', assignment)
                                    }
                                >
                                    <SlReload />
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
                <DetailAssignment
                    handleClose={handleClose}
                    showDetail={showDetail}
                    assignmentDetail={assignmentDetail}
                />

                <ConfirmModal
                    info={infoShow}
                    showModal={showReturn}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
};

export default Display;
