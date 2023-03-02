import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import {
    FaRegWindowClose,
    FaCaretDown,
    FaCaretUp,
    FaSearch,
} from 'react-icons/fa';

import './SelectTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../../AlertMessage/AlertMessage';
import request from '../../../utils/request';
import {
    setSort,
    setSearch,
    setUserAssignment,
    setAssetAssignment,
    getAllUsers,
    getAllAssets,
} from '../../../Actions/userActions';
import HoverItem from '../../HoverItem';
import AppPagination from '../../Pagination/AppPagination';
import Loading from '../../Loading/Loading';

function SelectTable(props) {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    const table = props.table || false;
    const maxLengthUser = 257;
    const maxLengthAsset = 128;

    const idAssetCheck = props.idAssetCheck;
    const idUserCheck = props.idUserCheck;

    const [userList, setUserList] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const sortAction = useSelector((state) => state.user.sortAction);
    const [sortColumn, setSortColumn] = useState(sortAction.sortColumn);
    const [sortType, setSortType] = useState(sortAction.sortType);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkRadio, SetCheckRadio] = useState(0);
    const [checkUser, setCheckUser] = useState('');
    const [checkRadioAsset, SetCheckRadioAsset] = useState(0);
    const [checkAsset, setCheckAsset] = useState('');
    const [showMessageUser, setShowMessageUser] = useState(false);
    const [showMessageAsset, setShowMessageAsset] = useState(false);
    // const success = useSelector((state) => state.user.success);
    const [successLoadingUser, setSuccessLoadingUser] = useState(false);
    const [successLoadingAsset, setSuccessLoadingAsset] = useState(false);
    const meta = useSelector((state) => state.user.meta);
    useEffect(() => {
        const showModal = async () => {
            await setCurrentPage(1);
            await SetCheckRadio(0);
            await SetCheckRadioAsset(0);
            await setCheckUser('');
            await setCheckAsset('');
            await dispatch(setSearch(''));
            await setIsShow(show);
        };
        showModal();
    }, [show]);
    useEffect(() => {
        const getUserList = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            let search;

            // if (sortAction.sortType == null) sortAction.sortType = '';
            if (sortAction.search == null || sortAction.search === '')
                search = '';
            else search = '&search=' + sortAction.search;
            // if (sortAction.type == null) sortAction.type = 'all';
            let endpoint = '/';
            if (table) {
                if (sortAction.sortColumn === '')
                    sortAction.sortColumn = 'full_name';
                endpoint =
                    '/user?page=' +
                    currentPage +
                    '&create-assignment=1' +
                    '&sort=' +
                    sortAction.sortColumn +
                    '&sorttype=' +
                    sortAction.sortType +
                    search;
                const response = await request.get(endpoint, headers);
                setUserList(response.data.data);
                await dispatch(
                    getAllUsers({
                        data: response.data.data,
                        meta: response.data.meta,
                        success: true,
                    })
                );
                setSuccessLoadingUser(true);
                setSuccessLoadingAsset(false);
            } else {
                if (sortAction.sortColumn === '')
                    sortAction.sortColumn = 'asset_name';
                const edit = idAssetCheck
                    ? '&edit-assignment=' + idAssetCheck
                    : '';
                endpoint =
                    '/asset?page=' +
                    currentPage +
                    edit +
                    '&sort=' +
                    sortAction.sortColumn +
                    '&sorttype=' +
                    sortAction.sortType +
                    search +
                    '&status_id=1';
                const response = await request.get(endpoint, headers);
                setAssetList(response.data.data);
                await dispatch(
                    getAllAssets({
                        data: response.data.data,
                        meta: response.data.meta,
                        success: true,
                    })
                );
                setSuccessLoadingAsset(true);
                setSuccessLoadingUser(false);
            }
        };
        getUserList();
    }, [sortAction, successLoadingAsset, successLoadingUser]);

    const handleClickSort = (sortName) => {
        if (sortColumn !== sortName) {
            setSortColumn(sortName);
            setSortType(2);
            dispatch(setSort(sortName, 2));
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
    };

    // Search
    const [userWords, setUserWords] = useState('');
    const [assetWords, setAssetWords] = useState('');

    const onUserSearch = (event) => {
        event.preventDefault();
        if (event.target.value.length <= maxLengthUser) {
            setUserWords(event.target.value);
            setShowMessageUser(false);
        } else {
            setUserWords(event.target.value.substring(0, maxLengthUser));
            setShowMessageUser(true);
        }
    };

    const onAssetSearch = (event) => {
        event.preventDefault();
        if (event.target.value.length <= maxLengthAsset) {
            setAssetWords(event.target.value);
            setShowMessageAsset(false);
        } else {
            setAssetWords(event.target.value.substring(0, maxLengthAsset));
            setShowMessageAsset(true);
        }
    };

    const handleClickSearchUser = () => {
        setSuccessLoadingUser(false);
        // dispatch(setFirstShowUser({ data: {} }));
        // props.setCurrentPage(1);
        const searchWords = userWords.replace(/[^a-zA-Z0-9\s]/g, '!');
        dispatch(setSearch(searchWords));
    };

    const handleClickSearchAsset = () => {
        setSuccessLoadingAsset(false);
        // dispatch(setFirstShowUser({ data: {} }));
        // props.setCurrentPage(1);
        const searchWords = assetWords.replace(/[^a-zA-Z0-9\s]/g, '!');
        dispatch(setSearch(searchWords));
    };

    const handleCheckRadio = (e) => {
        if (table) {
            userList.forEach((user) => {
                SetCheckRadio(e.target.value);
                if (user.id === parseInt(e.target.value)) {
                    setCheckUser(user);
                }
            });
        } else {
            assetList.forEach((asset) => {
                SetCheckRadioAsset(e.target.value);
                if (asset.id === parseInt(e.target.value)) {
                    setCheckAsset(asset);
                }
            });
        }
    };

    const handleSubmit = () => {
        if (table) {
            props.onChangeUser(checkUser.id);
            dispatch(setUserAssignment(checkRadio, checkUser.full_name));
        } else {
            props.onChangeAsset(checkAsset.id);
            dispatch(
                setAssetAssignment(checkRadioAsset, checkAsset.asset_name)
            );
        }
        setIsShow(false);
    };

    const getClassNameHoverItem = (content, contentCut) => {
        if (content === contentCut) {
            return 'not-hover-item';
        } else {
            return 'hover-item';
        }
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

    return (
        <>
            <div className="show-user-list">
                <span onClick={() => setIsShow(true)}>{props.text}</span>
                {table ? (
                    <Modal
                        show={isShow}
                        onHide={() => setIsShow(false)}
                        className="modal-content-list-select"
                        animation={false}
                    >
                        <Modal.Header>
                            <Row>
                                <Col xs={4}>
                                    <Modal.Title>Select User</Modal.Title>
                                </Col>
                                <Col xs={6} className="col-search">
                                    <InputGroup className="input-group">
                                        <Form.Control
                                            placeholder=""
                                            aria-label=""
                                            maxLength={maxLengthUser + 1}
                                            onChange={onUserSearch}
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter') {
                                                    handleClickSearchUser();
                                                }
                                            }}
                                        />

                                        <Button
                                            variant="danger"
                                            className="btn-search"
                                            onClick={handleClickSearchUser}
                                            disabled={
                                                userWords.length >
                                                    maxLengthUser && 'disabled'
                                            }
                                        >
                                            <FaSearch />
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col xs={2}>
                                    <Button
                                        variant="danger"
                                        onClick={() => setIsShow(false)}
                                        className="btn-close-detail-user"
                                    >
                                        <FaRegWindowClose />
                                    </Button>
                                </Col>
                            </Row>
                        </Modal.Header>
                        <Modal.Body>
                            {showMessageUser && (
                                <AlertMessage
                                    variant="danger"
                                    message={
                                        'Field Search exceeds maximum length (' +
                                        maxLengthUser +
                                        ')'
                                    }
                                    timeShow={3000}
                                />
                            )}
                            <div className="scroll-select">
                                <div className="list-select">
                                    <Row>
                                        <Col xs={1}>
                                            <div className="field">
                                                <span className="btn-field">
                                                    <b>Select</b>
                                                </span>
                                            </div>
                                        </Col>
                                        <Col xs={3} className="col-box-modal">
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort(
                                                        'staff_code'
                                                    )
                                                }
                                            >
                                                <span className="btn-field">
                                                    <span>
                                                        <b>Staff Code</b>
                                                    </span>
                                                    {sortColumn ===
                                                        'staff_code' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'staff_code' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col xs={5} className="col-box-modal">
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort('full_name')
                                                }
                                            >
                                                <span className="btn-field">
                                                    <span>
                                                        <b>Full Name</b>
                                                    </span>
                                                    {sortColumn === '' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'full_name' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'full_name' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col
                                            xs={3}
                                            className="col-box-modal-type"
                                        >
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort('admin')
                                                }
                                            >
                                                <span className="btn-field">
                                                    <span>
                                                        <b>Type</b>
                                                    </span>

                                                    {sortColumn === 'admin' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn === 'admin' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>

                                    {!successLoadingUser && <Loading />}
                                    {successLoadingUser &&
                                        userList.length === 0 && (
                                            <AlertMessage
                                                variant="danger"
                                                message="User cannot be found"
                                            />
                                        )}
                                    <div className="srcoll-hz">
                                        {successLoadingUser &&
                                            userList.map((user) => {
                                                return (
                                                    <Row
                                                        key={user.id}
                                                        className="row-user-list"
                                                    >
                                                        <Col
                                                            xs={1}
                                                            className="col-radio"
                                                        >
                                                            <Form.Check
                                                                type="radio"
                                                                name="select-item"
                                                                defaultChecked={
                                                                    idUserCheck ===
                                                                    user.id
                                                                }
                                                                value={user.id}
                                                                onChange={
                                                                    handleCheckRadio
                                                                }
                                                            ></Form.Check>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <span>
                                                                {
                                                                    user.staff_code
                                                                }
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            xs={5}
                                                            className={getClassNameHoverItem(
                                                                user.full_name,
                                                                getTextAfterCut(
                                                                    user.full_name,
                                                                    'select_table_full_name'
                                                                )
                                                            )}
                                                            id={
                                                                'select_table_full_name'
                                                            }
                                                            data-hover={
                                                                user.full_name
                                                            }
                                                        >
                                                            <HoverItem
                                                                content={
                                                                    user.full_name
                                                                }
                                                                contentCut={getTextAfterCut(
                                                                    user.full_name,
                                                                    'select_table_full_name'
                                                                )}
                                                            ></HoverItem>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <span>
                                                                {user.type}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <AppPagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pageNumber={sortAction && sortAction.page}
                                meta={meta}
                            />
                            <Row className="box-containers" xs="auto">
                                <Col className="box-button">
                                    <button
                                        className="btn-cancel"
                                        onClick={() => setIsShow(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn-save"
                                        onClick={() => handleSubmit()}
                                    >
                                        Save
                                    </button>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                ) : (
                    <Modal
                        show={isShow}
                        onHide={() => setIsShow(false)}
                        className="modal-content-list-select"
                        animation={false}
                    >
                        <Modal.Header>
                            <Row>
                                <Col xs={4}>
                                    <Modal.Title>Select Asset</Modal.Title>
                                </Col>
                                <Col xs={6} className="col-search">
                                    <InputGroup className="input-group">
                                        <Form.Control
                                            placeholder=""
                                            aria-label=""
                                            maxLength={maxLengthAsset + 1}
                                            onChange={onAssetSearch}
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter') {
                                                    handleClickSearchAsset();
                                                }
                                            }}
                                        />

                                        <Button
                                            variant="danger"
                                            className="btn-search"
                                            onClick={handleClickSearchAsset}
                                            disabled={
                                                assetWords.length >
                                                    maxLengthAsset && 'disabled'
                                            }
                                        >
                                            <FaSearch />
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col xs={2}>
                                    <Button
                                        variant="danger"
                                        onClick={() => setIsShow(false)}
                                        className="btn-close-detail-user"
                                    >
                                        <FaRegWindowClose />
                                    </Button>
                                </Col>
                            </Row>
                        </Modal.Header>
                        <Modal.Body>
                            {showMessageAsset && (
                                <AlertMessage
                                    variant="danger"
                                    message={
                                        'Field Search exceeds maximum length (' +
                                        maxLengthAsset +
                                        ')'
                                    }
                                    timeShow={3000}
                                />
                            )}
                            <div className="scroll-select">
                                <div className="list-select">
                                    <Row>
                                        <Col xs={1}>
                                            <div className="field">
                                                <Button className="btn-field">
                                                    <b>Select</b>
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col xs={3} className="col-box-modal">
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort(
                                                        'asset_code'
                                                    )
                                                }
                                            >
                                                <Button className="btn-field">
                                                    <span>
                                                        <b>Asset Code</b>
                                                    </span>
                                                    {sortColumn ===
                                                        'asset_code' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'asset_code' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col xs={5} className="col-box-modal">
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort(
                                                        'asset_name'
                                                    )
                                                }
                                            >
                                                <Button className="btn-field">
                                                    <span>
                                                        <b>Asset Name</b>
                                                    </span>
                                                    {sortColumn === '' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'asset_name' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'asset_name' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col
                                            xs={3}
                                            className="col-box-modal-category"
                                        >
                                            <div
                                                className="field"
                                                onClick={() =>
                                                    handleClickSort(
                                                        'category_name'
                                                    )
                                                }
                                            >
                                                <Button className="btn-field">
                                                    <span>
                                                        <b>Category</b>
                                                    </span>

                                                    {sortColumn ===
                                                        'category_name' &&
                                                        sortType === 2 && (
                                                            <FaCaretDown />
                                                        )}
                                                    {sortColumn ===
                                                        'category_name' &&
                                                        sortType === 1 && (
                                                            <FaCaretUp />
                                                        )}
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    {!successLoadingAsset && <Loading />}
                                    {successLoadingAsset &&
                                        assetList.length === 0 && (
                                            <AlertMessage
                                                variant="danger"
                                                message="Asset cannot be found"
                                            />
                                        )}
                                    <div className="srcoll-hz">
                                        {successLoadingAsset &&
                                            assetList.map((asset) => {
                                                return (
                                                    <Row
                                                        key={asset.id}
                                                        className="row-user-list"
                                                    >
                                                        <Col
                                                            xs={1}
                                                            className="col-radio"
                                                        >
                                                            <Form.Check
                                                                type="radio"
                                                                name="select-item"
                                                                defaultChecked={
                                                                    idAssetCheck ===
                                                                    asset.id
                                                                }
                                                                value={asset.id}
                                                                onChange={
                                                                    handleCheckRadio
                                                                }
                                                            ></Form.Check>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <span>
                                                                {
                                                                    asset.asset_code
                                                                }
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            xs={5}
                                                            className={getClassNameHoverItem(
                                                                asset.asset_name,
                                                                getTextAfterCut(
                                                                    asset.asset_name,
                                                                    'select_table_asset_name'
                                                                )
                                                            )}
                                                            id={
                                                                'select_table_asset_name'
                                                            }
                                                            data-hover={
                                                                asset.asset_name
                                                            }
                                                        >
                                                            <HoverItem
                                                                content={
                                                                    asset.asset_name
                                                                }
                                                                contentCut={getTextAfterCut(
                                                                    asset.asset_name,
                                                                    'select_table_asset_name'
                                                                )}
                                                            ></HoverItem>
                                                        </Col>
                                                        <Col
                                                            xs={3}
                                                            className={getClassNameHoverItem(
                                                                asset.category,
                                                                getTextAfterCut(
                                                                    asset.category,
                                                                    'select_table_asset_category'
                                                                )
                                                            )}
                                                            id={
                                                                'select_table_asset_category'
                                                            }
                                                            data-hover={
                                                                asset.category
                                                            }
                                                        >
                                                            <HoverItem
                                                                content={
                                                                    asset.category
                                                                }
                                                                contentCut={getTextAfterCut(
                                                                    asset.category,
                                                                    'select_table_asset_category'
                                                                )}
                                                            ></HoverItem>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <AppPagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pageNumber={sortAction && sortAction.page}
                                meta={meta}
                            />
                            <Row className="box-containers" xs="auto">
                                <Col className="box-button">
                                    <button
                                        className="btn-cancel"
                                        onClick={() => setIsShow(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn-save"
                                        onClick={() => handleSubmit()}
                                    >
                                        Save
                                    </button>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
}

export default SelectTable;
