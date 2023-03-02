import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegWindowClose } from 'react-icons/fa';
import './DetailUser.scss';
import moment from 'moment';

const DetailUser = (props) => {
    return (
        <Modal
            show={props.showDetail}
            // onHide={props.handleClose}
            className="detail-user"
        >
            <Modal.Header>
                <Modal.Title>
                    <b>Detailed User Information</b>
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
                    <p className="title">Staff Code</p>

                    <p className="infor">{props.userDetail.staff_code}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Full Name</p>

                    <p className="infor">{props.userDetail.full_name}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Username</p>

                    <p className="infor">{props.userDetail.user_name}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Date of Birth</p>

                    <p className="infor">
                        {moment(props.userDetail.date_of_birth).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Gender</p>

                    <p className="infor">{props.userDetail.gender}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Joined Date</p>

                    <p className="infor">
                        {moment(props.userDetail.joined_date).format(
                            'DD/MM/YYYY'
                        )}
                    </p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Type</p>

                    <p className="infor">{props.userDetail.type}</p>
                </div>
                <div className="detail-modal-home">
                    <p className="title">Location</p>

                    <p className="infor">
                        {props.userDetail.location
                            ? props.userDetail.location.location_prefix
                            : ''}
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DetailUser;
