import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegWindowClose } from 'react-icons/fa';
import moment from 'moment';
import './style.scss';

const Index = (props) => {
    return (
        <Modal show={props.showDetail} className="detail-request">
            <Modal.Header>
                <Modal.Title>
                    <b>Details Returning Request Information</b>
                </Modal.Title>
                <Button
                    variant="danger"
                    onClick={props.handleClose}
                    className="btn-close-detail-user"
                >
                    <FaRegWindowClose />
                </Button>
            </Modal.Header>
            <Modal.Body>
                <div className="detail-modal-home">
                    <p className="title">Asset Code</p>
                    <p className="infor">{props.requestDetail.asset_code}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Asset Name</p>
                    <p className="infor">{props.requestDetail.asset_name}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Requested by</p>
                    <p className="infor">{props.requestDetail.requested_by}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Assigned Date</p>
                    <p className="infor">
                        {moment(props.requestDetail.assigned_date).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Accepted by</p>
                    <p className="infor">{props.requestDetail.accepted_by}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Returned Date</p>
                    <p
                        className={
                            (props.requestDetail.returned_date === null &&
                                'invalid-data') ||
                            (props.requestDetail.returned_date !== null &&
                                'title')
                        }
                    >
                        {moment(props.requestDetail.returned_date).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">State</p>
                    <p className="infor">{props.requestDetail.state}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Index;
