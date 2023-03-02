import React, { useState, useEffect } from 'react';

import * as request from '../../../utils/request';
import { Button, Modal } from 'react-bootstrap';
import { FaRegWindowClose } from 'react-icons/fa';
import './DetailAsset.scss';
import Loading from '../../Loading/Loading';
import moment from 'moment';

const DetailAsset = (props) => {
    const [history, setHistory] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setSuccess(false);
        const fetchHistory = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const headers = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const res = await request.get(
                    `/assignments-by-asset-id?id=${props.assetDetail.id}`,
                    headers
                );
                setSuccess(true);
                setHistory(res.data.data);
            } catch (error) {
                console.log(error.response.data.error);
            }
        };
        if (props.showDetail === true) {
            fetchHistory();
        }
    }, [props.showDetail]);

    return (
        <Modal
            show={props.showDetail}
            // onHide={props.handleClose}
            className="detail-asset"
        >
            <Modal.Header>
                <Modal.Title>
                    <b>Detailed Asset Information</b>
                </Modal.Title>
                <Button
                    variant="danger"
                    onClick={props.handleClose}
                    className="btn-close-detail-asset"
                >
                    <FaRegWindowClose />
                </Button>
            </Modal.Header>
            <Modal.Body>
                <div className="detail-modal-asset">
                    <p className="title">Asset Code</p>
                    <p className="infor">{props.assetDetail.asset_code}</p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">Asset Name</p>
                    <p className="infor">{props.assetDetail.asset_name}</p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">Category</p>
                    <p className="infor">{props.assetDetail.category}</p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">Installed Date</p>
                    <p className="infor">
                        {moment(props.assetDetail.installed_date).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">State</p>
                    <p className="infor">{props.assetDetail.state}</p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">Location</p>
                    <p className="infor">{props.assetDetail.location}</p>
                </div>
                <div className="detail-modal-asset">
                    <p className="title">Specification</p>
                    <p className="infor">{props.assetDetail.specification}</p>
                </div>
                <div className="detail-modal-asset-history">
                    <div className="title">
                        <p>History</p>
                    </div>
                    <div className="scroll">
                        <div className="table-detail">
                            <div className="detail-modal-asset">
                                <div>
                                    <div className="field-date">
                                        <div>
                                            <span>
                                                <b>Date</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="field-to">
                                        <div className="btn-field">
                                            <span>
                                                <b>Assigned to</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="field-by">
                                        <div className="btn-field">
                                            <span>
                                                <b>Assigned by</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="field-returned">
                                        <div className="btn-field">
                                            <span>
                                                <b>Returned Date</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!success && <Loading />}
                            {success &&
                                history &&
                                history.map((item) => {
                                    return (
                                        <div
                                            key={'detail_asset' + item.id}
                                            className="detail-modal-asset"
                                        >
                                            <div className="infor-date">
                                                <span>
                                                    {moment(
                                                        item.assignment_date_assigned
                                                    ).format('DD/MM/YYYY')}
                                                </span>
                                            </div>
                                            <div className="infor-to">
                                                <span>
                                                    {item.assignment_to}
                                                </span>
                                            </div>
                                            <div className="infor-by">
                                                <span>
                                                    {item.assignment_by}
                                                </span>
                                            </div>
                                            <div className="">
                                                <span
                                                    className={
                                                        (item.assignment_date_returned ===
                                                            null &&
                                                            'invalid-data') ||
                                                        (item.assignment_date_returned !==
                                                            null &&
                                                            'infor-returned')
                                                    }
                                                >
                                                    {item.assignment_date_returned ===
                                                    null
                                                        ? 'Invalid'
                                                        : moment(
                                                              item.assignment_date_returned
                                                          ).format(
                                                              'DD/MM/YYYY'
                                                          )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DetailAsset;
