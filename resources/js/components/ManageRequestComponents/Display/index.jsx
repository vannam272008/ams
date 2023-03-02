import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import DetailRequest from '../DetailRequest';

import { useDispatch, useSelector } from 'react-redux';
import {
    setSortRequest,
    setFirstShowRequest,
    changePage,
} from '../../../Actions/userActions';
import HoverItem from '../../HoverItem';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { GrFormClose } from 'react-icons/gr';
import AlertMessage from '../../AlertMessage/AlertMessage';
import ConfirmModal from '../../ConfirmModal/index';
import swal from 'sweetalert';
import * as request from '../../../utils/request';

const Display = (props) => {
    const [showDetail, setShowDetail] = useState(false);
    const requestList = useSelector((state) => state.user.requestList);
    const sortRequestAction = useSelector(
        (state) => state.user.sortRequestAction
    );
    const [requestDetail, setRequestDetail] = useState({});
    const [sortColumn, setSortColumn] = useState(sortRequestAction.sortColumn);
    const [sortType, setSortType] = useState(sortRequestAction.sortType);
    const dispatch = useDispatch();
    const [typeChange, setTypeChange] = useState('');
    const [infoShow, setInfoShow] = useState({});
    const [showReturn, setShowReturn] = useState(false);
    const [requestChange, setRequestChange] = useState({});
    const [requestFirst, setRequestFirst] = useState({});
    const requestFirstShown = useSelector(
        (state) => state.user.requestFirstShown
    );

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
            dispatch(setSortRequest(sortName, 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSortRequest(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSortRequest(sortColumn, 2));
            }
        }
        props.setCurrentPage(1);
    };

    const handleShow = () => {
        setShowDetail(true);
    };

    const handleClose = () => {
        setShowDetail(false);
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

    useEffect(() => {
        setRequestFirst(requestFirstShown);
    }, [requestFirstShown]);

    const handleShowModal = (type, request) => {
        if (type === 'accept') {
            setInfoShow({
                title: 'Are you sure?',
                detail: `Do you want to mark this returning request as 'Completed'?`,
                contentBtn: 'Yes',
                cancelBtn: 'No',
            });
        } else if (type === 'cancel') {
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to cancel this returning request?',
                contentBtn: 'Yes',
                cancelBtn: 'No',
            });
        }
        showModal();
        setTypeChange(type);
        setRequestChange(request);
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
            if (typeChange === 'accept') {
                const data = {
                    id: requestChange.id,
                };
                const endpoint = `/request-for-returning?id=${requestChange.id}`;
                const response = await request.patch(endpoint, data, headers);
                swal({
                    text: 'Returning request is completed!',
                    dangerMode: true,
                });
                dispatch(setFirstShowRequest({ data: response.data.data }));
            } else {
                const data = {
                    id: requestChange.id,
                };
                const endpoint = `/request-for-returning?id=${requestChange.id}`;
                await request.remove(endpoint, data, headers);
                swal({
                    text: 'Returning request is canceled!',
                    dangerMode: true,
                });
                dispatch(changePage(props.currentPage));
            }
        } catch (error) {
            swal({
                text: 'Action request for returning error!',
                dangerMode: true,
            });
        }
    };

    return (
        <div className="scroll-request">
            <div className="list-request">
                <Row>
                    <Col xs={'0-5'}>
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

                    <Col xs={'1-25'}>
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

                    <Col xs={'1-75'}>
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
                            onClick={() => handleClickSort('requested_by')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Requested by</b>
                                </span>
                                {sortColumn === 'requested_by' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'requested_by' &&
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

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('accepted_by')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Accepted by</b>
                                </span>
                                {sortColumn === 'accepted_by' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'accepted_by' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'1-5'}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('returned_date')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Returned Date</b>
                                </span>
                                {sortColumn === 'returned_date' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'returned_date' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>

                    <Col xs={'2'}>
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
                {requestList && requestList.length === 0 && (
                    <AlertMessage
                        variant="danger"
                        message="Returning request cannot be found"
                    />
                )}

                {requestFirst.id && (
                    <Row className="row-user-list">
                        <Col
                            xs={'0-5'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span>1</span>
                        </Col>
                        <Col
                            xs={'1-25'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span>{requestFirst.asset_code}</span>
                        </Col>
                        <Col
                            xs={'1-75'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                            className={getClassNameHoverItem(
                                requestFirst.asset_name,
                                getTextAfterCut(
                                    requestFirst.asset_name,
                                    'request_asset_name'
                                )
                            )}
                            id={'request_asset_name'}
                            data-hover={requestFirst.asset_name}
                        >
                            <HoverItem
                                content={requestFirst.asset_name}
                                contentCut={getTextAfterCut(
                                    requestFirst.asset_name,
                                    'request_asset_name'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span>{requestFirst.requested_by}</span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span>
                                {moment(requestFirst.assigned_date).format(
                                    'DD/MM/YYYY'
                                )}
                            </span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span
                                className={
                                    requestFirst.accepted_by === null
                                        ? 'invalid-data'
                                        : ''
                                }
                            >
                                {requestFirst.accepted_by === null
                                    ? 'Invalid'
                                    : requestFirst.accepted_by}
                            </span>
                        </Col>
                        <Col
                            xs={'1-5'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span
                                className={
                                    requestFirst.returned_date === null
                                        ? 'invalid-data'
                                        : ''
                                }
                            >
                                {moment(requestFirst.returned_date).format(
                                    'DD/MM/YYYY'
                                )}
                            </span>
                        </Col>
                        <Col
                            xs={'2'}
                            onClick={() => {
                                handleShow();
                                setRequestDetail(requestFirst);
                                // setAssignmentDetail(assignment);
                            }}
                        >
                            <span>{requestFirst.state}</span>
                        </Col>
                        <Col className="accepted-reject" xs={'0-5'}>
                            <Button
                                variant="danger"
                                className="btn-accepted"
                                disabled={
                                    requestFirst.state === 'Completed' ||
                                    requestFirst.state === 'Accepted'
                                }
                                onClick={() =>
                                    handleShowModal('accept', requestFirst)
                                }
                            >
                                <TiTick />
                            </Button>
                            <Button
                                className="btn-reject"
                                disabled={
                                    requestFirst.state === 'Completed' ||
                                    requestFirst.state === 'Accepted'
                                }
                                onClick={() =>
                                    handleShowModal('cancel', requestFirst)
                                }
                            >
                                <GrFormClose />
                            </Button>
                        </Col>
                    </Row>
                )}
                {(requestList.find(
                    (request) => request.id === requestFirst.id
                ) === undefined && requestFirst.id
                    ? requestList.slice(0, 19)
                    : requestList.filter(
                          (request) => request.id !== requestFirst.id
                      )
                ).map((request, index) => {
                    return (
                        <Row key={index} className="row-user-list">
                            <Col
                                xs={'0-5'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span>
                                    {requestFirst.id
                                        ? index +
                                          2 +
                                          sortRequestAction.page * 20 -
                                          20
                                        : index +
                                          1 +
                                          sortRequestAction.page * 20 -
                                          20}
                                </span>
                            </Col>
                            <Col
                                xs={'1-25'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{request.asset_code}</span>
                            </Col>
                            <Col
                                xs={'1-75'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                                className={getClassNameHoverItem(
                                    request.asset_name,
                                    getTextAfterCut(
                                        request.asset_name,
                                        'request_asset_name'
                                    )
                                )}
                                id={'request_asset_name'}
                                data-hover={request.asset_name}
                            >
                                <HoverItem
                                    content={request.asset_name}
                                    contentCut={getTextAfterCut(
                                        request.asset_name,
                                        'request_asset_name'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{request.requested_by}</span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span>
                                    {moment(request.assigned_date).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span
                                    className={
                                        request.accepted_by === null
                                            ? 'invalid-data'
                                            : ''
                                    }
                                >
                                    {request.accepted_by === null
                                        ? 'Invalid'
                                        : request.accepted_by}
                                </span>
                            </Col>
                            <Col
                                xs={'1-5'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span
                                    className={
                                        request.returned_date === null
                                            ? 'invalid-data'
                                            : ''
                                    }
                                >
                                    {moment(request.returned_date).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                            </Col>
                            <Col
                                xs={'2'}
                                onClick={() => {
                                    handleShow();
                                    setRequestDetail(request);
                                    // setAssignmentDetail(assignment);
                                }}
                            >
                                <span>{request.state}</span>
                            </Col>
                            <Col className="accepted-reject" xs={'0-5'}>
                                <Button
                                    variant="danger"
                                    className="btn-accepted"
                                    disabled={
                                        request.state === 'Completed' ||
                                        request.state === 'Accepted'
                                    }
                                    onClick={() =>
                                        handleShowModal('accept', request)
                                    }
                                >
                                    <TiTick />
                                </Button>
                                <Button
                                    className="btn-reject"
                                    disabled={
                                        request.state === 'Completed' ||
                                        request.state === 'Accepted'
                                    }
                                    onClick={() =>
                                        handleShowModal('cancel', request)
                                    }
                                >
                                    <GrFormClose />
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
                <DetailRequest
                    handleClose={handleClose}
                    showDetail={showDetail}
                    requestDetail={requestDetail}
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
