import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import './Display.scss';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import {
    changePage,
    setAssetSort,
    setDefaultFirstRecord,
} from '../../../Actions/userActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import DetailAsset from '../DetailAsset/DetailAsset';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../../AlertMessage/AlertMessage';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import HoverItem from '../../HoverItem';
import swal from 'sweetalert';
import ConfirmModal from '../../ConfirmModal';
import ConfirmModalWarning from '../../ConfirmModalWarning';
import * as request from '../../../utils/request';

const Display = (props) => {
    const dispatch = useDispatch();
    const AssetFirstShown = useSelector((state) => state.user.assetFirstShown);
    const assetList = useSelector((state) => state.user.assetList);
    const sortAssetAction = useSelector((state) => state.user.sortAssetAction);
    const [showDetail, setShowDetail] = useState(false);
    const [assetDetail, setAssetDetail] = useState({});
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState(sortAssetAction.sortColumn);
    const [sortType, setSortType] = useState(sortAssetAction.sortType);
    const [assetFirst, setAssetFirst] = useState({});

    // Delete Asset
    const [idAsset, setIdAsset] = useState();
    const [infoShow, setInfoShow] = useState({});
    const [infoShowWarning, setInfoShowWarning] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        setAssetFirst(AssetFirstShown);
    }, [AssetFirstShown]);

    const handleClose = () => {
        setShowDetail(false);
    };

    const handleShow = () => {
        setShowDetail(true);
    };

    const getClassNameHoverItem = (content, contentCut) => {
        if (content === contentCut) {
            return 'not-hover-item';
        } else {
            return 'hover-item';
        }
    };

    const handleClickSort = (field) => {
        if (sortColumn !== field) {
            setSortColumn(field);
            setSortType(2);
            dispatch(setAssetSort(field, 2));
        } else {
            if (sortType === 2) {
                setSortType(1);
                dispatch(setAssetSort(sortColumn, 1));
            }
            if (sortType === 1) {
                setSortType(2);
                dispatch(setAssetSort(sortColumn, 2));
            }
        }
        setAssetFirst({});
        props.setCurrentPage(1);
    };

    const handleRedirect = (id) => {
        props.setSuccessLoading(false);
        const path = `/manage-asset/edit/${id}`;
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

    // Delete Asset ===========================================================================

    const handleShowModal = (asset) => {
        console.log(asset);
        if (asset.has_assignment) {
            setIdAsset(asset.id);
            setInfoShowWarning({
                title: 'Cannot delete asset',
                detail: 'Cannot delete the asset because it belongs to one or more historical assignments.',
                detailRedirect:
                    'If the asset is not able to be used anymore, please update its state in',
                redirect: 'Edit Asset page',
            });
            showModal('warning');
        } else {
            setIdAsset(asset.id);
            setInfoShow({
                title: 'Are you sure?',
                detail: 'Do you want to delete this asset?',
                contentBtn: 'Delete',
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

    const handleRedirectEdit = () => {
        const path = `/manage-asset/edit/${idAsset}`;
        navigate(path);
    };

    const handleConfirm = async () => {
        setShowDelete(false);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const endpoint = '/asset/delete';
            const data = {
                asset_id: idAsset,
            };
            await request.remove(endpoint, data, headers);
            swal({
                text: 'Delete asset successfully!',
                dangerMode: true,
            });
            dispatch(changePage(props.currentPage));
            dispatch(setDefaultFirstRecord());
        } catch (error) {
            setInfoShowWarning({
                title: 'Can not delete asset',
                detail: 'Cannot delete the asset because it belongs to one or more historical assignments.',
                detailRedirect:
                    'If the asset is not able to be used anymore, please update its state in',
                redirect: 'Edit Asset page',
            });
            showModal('warning');
            // swal({
            //     text: 'Delete asset error!',
            //     dangerMode: true,
            // });
        }
    };

    return (
        <div className="scroll-asset">
            <div className="list-assets">
                <Row>
                    <Col xs={2}>
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
                    <Col xs={4}>
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
                    <Col xs={3}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('category_name')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>Category</b>
                                </span>
                                {sortColumn === 'category_name' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'category_name' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div
                            className="field"
                            onClick={() => handleClickSort('asset_status_name')}
                        >
                            <Button className="btn-field" variant="danger">
                                <span>
                                    <b>State</b>
                                </span>

                                {sortColumn === 'asset_status_name' &&
                                    sortType === 2 && <FaCaretDown />}
                                {sortColumn === 'asset_status_name' &&
                                    sortType === 1 && <FaCaretUp />}
                            </Button>
                        </div>
                    </Col>
                </Row>
                {assetList && assetList.length === 0 && (
                    <AlertMessage
                        variant="danger"
                        message="Asset cannot be found"
                    />
                )}

                {assetFirst.asset_code && (
                    <Row className="row-asset-list">
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setAssetDetail(assetFirst);
                            }}
                        >
                            <span>{assetFirst.asset_code}</span>
                        </Col>
                        <Col
                            xs={4}
                            onClick={() => {
                                handleShow();
                                setAssetDetail(assetFirst);
                            }}
                            className={getClassNameHoverItem(
                                assetFirst.asset_name,
                                getTextAfterCut(
                                    assetFirst.asset_name,
                                    'asset_first_asset_name'
                                )
                            )}
                            id={'asset_first_asset_name'}
                            data-hover={assetFirst.asset_name}
                        >
                            <HoverItem
                                content={assetFirst.asset_name}
                                contentCut={getTextAfterCut(
                                    assetFirst.asset_name,
                                    'asset_first_asset_name'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col
                            xs={3}
                            onClick={() => {
                                handleShow();
                                setAssetDetail(assetFirst);
                            }}
                            className={getClassNameHoverItem(
                                assetFirst.category,
                                getTextAfterCut(
                                    assetFirst.category,
                                    'asset_first_category'
                                )
                            )}
                            id={'asset_first_category'}
                            data-hover={assetFirst.category}
                        >
                            <HoverItem
                                content={assetFirst.category}
                                contentCut={getTextAfterCut(
                                    assetFirst.category,
                                    'asset_first_category'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col
                            xs={2}
                            onClick={() => {
                                handleShow();
                                setAssetDetail(assetFirst);
                            }}
                            className={getClassNameHoverItem(
                                assetFirst.state,
                                getTextAfterCut(
                                    assetFirst.state,
                                    'asset_first_state'
                                )
                            )}
                            id={'asset_first_state'}
                            data-hover={assetFirst.state}
                        >
                            <HoverItem
                                content={assetFirst.state}
                                contentCut={getTextAfterCut(
                                    assetFirst.state,
                                    'asset_first_state'
                                )}
                            ></HoverItem>
                        </Col>
                        <Col className="edit-delete" xs={1}>
                            <Button
                                variant="danger"
                                className="btn-edit"
                                disabled={assetFirst.state === 'Assigned'}
                                onClick={() => handleRedirect(assetFirst.id)}
                            >
                                <MdOutlineModeEditOutline />
                            </Button>
                            <Button
                                className="btn-delete"
                                variant="danger"
                                disabled={assetFirst.state === 'Assigned'}
                                onClick={() => handleShowModal(assetFirst)}
                            >
                                <AiOutlineCloseCircle />
                            </Button>
                        </Col>
                    </Row>
                )}
                {(assetList.find(
                    (asset) => asset.asset_code === assetFirst.asset_code
                ) === undefined && assetFirst.asset_code
                    ? assetList.slice(0, 19)
                    : assetList.filter(
                          (asset) => asset.asset_code !== assetFirst.asset_code
                      )
                ).map((asset) => {
                    return (
                        <Row key={asset.id} className="row-asset-list">
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setAssetDetail(asset);
                                }}
                            >
                                <span>{asset.asset_code}</span>
                            </Col>
                            <Col
                                xs={4}
                                onClick={() => {
                                    handleShow();
                                    setAssetDetail(asset);
                                }}
                                className={getClassNameHoverItem(
                                    asset.asset_name,
                                    getTextAfterCut(
                                        asset.asset_name,
                                        'asset_name'
                                    )
                                )}
                                id={'asset_name'}
                                data-hover={asset.asset_name}
                            >
                                <HoverItem
                                    content={asset.asset_name}
                                    contentCut={getTextAfterCut(
                                        asset.asset_name,
                                        'asset_name'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col
                                xs={3}
                                onClick={() => {
                                    handleShow();
                                    setAssetDetail(asset);
                                }}
                                className={getClassNameHoverItem(
                                    asset.category,
                                    getTextAfterCut(asset.category, 'category')
                                )}
                                id={'category'}
                                data-hover={asset.category}
                            >
                                <HoverItem
                                    content={asset.category}
                                    contentCut={getTextAfterCut(
                                        asset.category,
                                        'category'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col
                                xs={2}
                                onClick={() => {
                                    handleShow();
                                    setAssetDetail(asset);
                                }}
                                className={getClassNameHoverItem(
                                    asset.state,
                                    getTextAfterCut(asset.state, 'state')
                                )}
                                id={'state'}
                                data-hover={asset.state}
                            >
                                <HoverItem
                                    content={asset.state}
                                    contentCut={getTextAfterCut(
                                        asset.state,
                                        'state'
                                    )}
                                ></HoverItem>
                            </Col>
                            <Col className="edit-delete" xs={1}>
                                <Button
                                    variant="danger"
                                    className="btn-edit"
                                    disabled={asset.state === 'Assigned'}
                                    onClick={() => handleRedirect(asset.id)}
                                >
                                    <MdOutlineModeEditOutline />
                                </Button>
                                <Button
                                    className="btn-delete"
                                    variant="danger"
                                    disabled={asset.state === 'Assigned'}
                                    onClick={() => handleShowModal(asset)}
                                >
                                    <AiOutlineCloseCircle />
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
                <DetailAsset
                    handleClose={handleClose}
                    showDetail={showDetail}
                    assetDetail={assetDetail}
                />

                <ConfirmModalWarning
                    info={infoShowWarning}
                    showModal={showWarning}
                    onCancel={handleCancel}
                    onRedirectEdit={handleRedirectEdit}
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
