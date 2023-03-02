import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './Display.scss';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import moment from 'moment';

import { changePage, setSort } from '../../../Actions/userActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import DetailUser from '../DetailUser/DetailUser';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessage from '../../AlertMessage/AlertMessage';
import HoverItem from '../../HoverItem';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import ConfirmModal from '../../ConfirmModal';
import ConfirmModalWarning from '../../ConfirmModalWarning';
import swal from 'sweetalert';
import * as request from '../../../utils/request';

const Display = (props) => {
    const dispatch = useDispatch();
    const userFirstShown = useSelector((state) => state.user.userFirstShown);
    const userList = useSelector((state) => state.user.userList);
    const sortAction = useSelector((state) => state.user.sortAction);
    const [showDetail, setShowDetail] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState(sortAction.sortColumn);
    const [sortType, setSortType] = useState(sortAction.sortType);
    const [userFirst, setUserFirst] = useState({});
    // Delete User
    const [idUser, setIdUser] = useState();
    const [infoShow, setInfoShow] = useState({});
    const [infoShowWarning, setInfoShowWarning] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const currentLocation = JSON.parse(localStorage.getItem('location'));

    useEffect(() => {
        setUserFirst(userFirstShown);
    }, [userFirstShown]);

    const getClassNameHoverItem = (content, contentCut) => {
        if (content === contentCut) {
            return 'not-hover-item';
        } else {
            return 'hover-item';
        }
    };

    const handleClose = () => {
        setShowDetail(false);
    };

    const handleShow = () => {
        setShowDetail(true);
    };
    const handleClickSortStaffCode = () => {
        if (sortColumn !== 'staff_code') {
            setSortColumn('staff_code');
            setSortType(2);
            dispatch(setSort('staff_code', 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSort(sortColumn, 2));
            }
        }
        setUserFirst({});
        props.setCurrentPage(1);
    };

    const handleClickSortFullName = () => {
        if (sortColumn !== 'full_name') {
            setSortColumn('full_name');
            setSortType(2);
            dispatch(setSort('full_name', 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSort(sortColumn, 2));
            }
        }
        setUserFirst({});
        props.setCurrentPage(1);
    };

    const handleClickSortUserName = () => {
        if (sortColumn !== 'user_name') {
            setSortColumn('user_name');
            setSortType(2);
            dispatch(setSort('user_name', 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSort(sortColumn, 2));
            }
        }
        setUserFirst({});
        props.setCurrentPage(1);
    };

    const handleClickSortJionedDate = () => {
        if (sortColumn !== 'joined_date') {
            setSortColumn('joined_date');
            setSortType(2);
            dispatch(setSort('joined_date', 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSort(sortColumn, 2));
            }
        }
        setUserFirst({});
        props.setCurrentPage(1);
    };

    const handleClickSortType = () => {
        if (sortColumn !== 'admin') {
            setSortColumn('admin');
            setSortType(2);
            dispatch(setSort('admin', 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setSort(sortColumn, 2));
            }
        }
        setUserFirst({});
        props.setCurrentPage(1);
    };

    const handleRedirect = (id) => {
        props.setSuccessLoading(false);
        const path = `/manage-user/edit/${id}`;
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

    // Delete User ===========================================================================

    const handleShowModal = (user) => {
        if (user.has_assignment) {
            setInfoShowWarning({
                title: 'Cannot disable user',
                detail: 'There are valid assignments belonging to this user. Please close all assignments before disabling user.',
            });
            showModal('warning');
        } else {
            setIdUser(user.id);
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to disable this user?',
                contentBtn: 'Disable',
                cancelBtn: 'Cancel',
            });
            showModal('delete');
        }
    };

    const showModal = (type) => {
        if (type === 'warning') {
            setShowWarning(true);
        } else {
            setShowDelete(true);
        }
    };

    const handleCancel = (show) => {
        setShowWarning(show);
        setShowDelete(show);
    };

    const handleConfirm = async () => {
        setShowDelete(false);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/user/delete';
            const data = {
                user_id: idUser,
            };
            await request.remove(endpoint, data, headers);
            swal({
                text: 'Disable user successfully!',
                dangerMode: true,
            });
            dispatch(changePage(props.currentPage));
        } catch (error) {
            swal({
                text: 'Disable user error!',
                dangerMode: true,
            });
        }
    };

    return (
        <div className="scroll-user">
            <div className="list-users">
                <Row>
                    <Col xs={2}>
                        <div
                            className="field"
                            onClick={handleClickSortStaffCode}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Staff Code</b>
                                </span>
                                {sortColumn === 'staff_code' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'staff_code' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div
                            className="field"
                            onClick={handleClickSortFullName}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Full Name</b>
                                </span>

                                {sortColumn === 'full_name' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'full_name' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div
                            className="field"
                            onClick={handleClickSortUserName}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Username</b>
                                </span>
                                {sortColumn === 'user_name' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'user_name' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div
                            className="field"
                            onClick={handleClickSortJionedDate}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Joined date</b>
                                </span>

                                {sortColumn === 'joined_date' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'joined_date' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div className="field" onClick={handleClickSortType}>
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Type</b>
                                </span>

                                {sortColumn === 'admin' && sortType === 2 && (
                                    <FaCaretDown />
                                )}
                                {sortColumn === 'admin' && sortType === 1 && (
                                    <FaCaretUp />
                                )}
                            </Button>
                        </div>
                    </Col>
                </Row>
                {userList && userList.length === 0 && (
                    <AlertMessage
                        variant="danger"
                        message="User cannot be found"
                    />
                )}
                {userFirst.staff_code && (
                    <Row className="row-user-list">
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setUserDetail(userFirst);
                            }}
                        >
                            <span>{userFirst.staff_code}</span>
                        </Col>
                        <Col
                            xs={3}
                            onClick={() => {
                                handleShow();
                                setUserDetail(userFirst);
                            }}
                            className={getClassNameHoverItem(
                                userFirst.full_name,
                                getTextAfterCut(
                                    userFirst.full_name,
                                    'user_first_full_name'
                                )
                            )}
                            id={'user_first_full_name'}
                            data-hover={userFirst.full_name}
                        >
                            <HoverItem
                                content={userFirst.full_name}
                                contentCut={getTextAfterCut(
                                    userFirst.full_name,
                                    'user_first_full_name'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setUserDetail(userFirst);
                            }}
                        >
                            <span>{userFirst.user_name}</span>
                        </Col>
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setUserDetail(userFirst);
                            }}
                        >
                            <span>
                                {moment(userFirst.joined_date).format(
                                    'DD/MM/YYYY'
                                )}
                            </span>
                        </Col>
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setUserDetail(userFirst);
                            }}
                        >
                            <span>{userFirst.type}</span>
                        </Col>
                        <Col className="edit-delete" lg={1} md={1} sm={1}>
                            <Button
                                variant="danger"
                                className="btn-edit"
                                disabled={
                                    userFirst.location.location_prefix !==
                                    currentLocation.location_prefix
                                }
                                onClick={() => handleRedirect(userFirst.id)}
                            >
                                <MdOutlineModeEditOutline />
                            </Button>
                            <Button
                                className="btn-delete"
                                variant="danger"
                                disabled={
                                    userFirst.location.location_prefix !==
                                    currentLocation.location_prefix
                                }
                                onClick={() => handleShowModal(userFirst)}
                            >
                                <AiOutlineCloseCircle />
                            </Button>
                        </Col>
                    </Row>
                )}
                {(userList.find(
                    (user) => user.staff_code === userFirst.staff_code
                ) === undefined && userFirst.staff_code
                    ? userList.slice(0, 19)
                    : userList.filter(
                          (user) => user.staff_code !== userFirst.staff_code
                      )
                ).map((user) => {
                    return (
                        <Row key={user.id} className="row-user-list">
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setUserDetail(user);
                                }}
                            >
                                <span>{user.staff_code}</span>
                            </Col>
                            <Col
                                xs={3}
                                onClick={() => {
                                    handleShow();
                                    setUserDetail(user);
                                }}
                                className={getClassNameHoverItem(
                                    user.full_name,
                                    getTextAfterCut(
                                        user.full_name,
                                        'user_full_name'
                                    )
                                )}
                                id={'user_full_name'}
                                data-hover={user.full_name}
                            >
                                <HoverItem
                                    content={user.full_name}
                                    contentCut={getTextAfterCut(
                                        user.full_name,
                                        'user_full_name'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setUserDetail(user);
                                }}
                            >
                                <span>{user.user_name}</span>
                            </Col>
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setUserDetail(user);
                                }}
                            >
                                <span>
                                    {moment(user.joined_date).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                            </Col>
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setUserDetail(user);
                                }}
                            >
                                <span>{user.type}</span>
                            </Col>
                            <Col className="edit-delete" xs={1}>
                                <Button
                                    variant="danger"
                                    className="btn-edit"
                                    onClick={() => handleRedirect(user.id)}
                                >
                                    <MdOutlineModeEditOutline />
                                </Button>
                                <Button
                                    className="btn-delete"
                                    variant="danger"
                                    onClick={() => handleShowModal(user)}
                                >
                                    <AiOutlineCloseCircle />
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
                <DetailUser
                    handleClose={handleClose}
                    showDetail={showDetail}
                    userDetail={userDetail || userFirst}
                />

                <ConfirmModalWarning
                    info={infoShowWarning}
                    showModal={showWarning}
                    onCancel={handleCancel}
                />

                <ConfirmModal
                    info={infoShow}
                    showModal={showDelete}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
};

export default Display;
