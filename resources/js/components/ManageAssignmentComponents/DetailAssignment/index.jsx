import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegWindowClose } from 'react-icons/fa';
import moment from 'moment';
import './style.scss';

const Index = (props) => {
    return (
        <Modal show={props.showDetail} className="detail-assignment">
            <Modal.Header>
                <Modal.Title>
                    <b>Detailed Assignment Information</b>
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
                    <p className="infor">{props.assignmentDetail.asset_code}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Asset Name</p>
                    <p className="infor">{props.assignmentDetail.asset_name}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Specification</p>
                    <p className="infor">
                        {props.assignmentDetail.specification}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Assigned to</p>
                    <p className="infor">
                        {props.assignmentDetail.assigned_to}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Assigned by</p>
                    <p className="infor">
                        {props.assignmentDetail.assigned_by}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Assigned Date</p>
                    <p className="infor">
                        {moment(props.assignmentDetail.assigned_date).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">State</p>
                    <p className="infor">{props.assignmentDetail.state}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Note</p>
                    <p className="infor">{props.assignmentDetail.note}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Index;
