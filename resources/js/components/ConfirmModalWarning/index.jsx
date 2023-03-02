import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloseSquare } from 'react-icons/all';

import './style.scss';

const ConfirmModalWarning = (props) => {
    const { info, showModal, onCancel } = props;
    const { title, detail } = info;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(showModal);
    }, [showModal]);

    const handleCancel = () => {
        setShow(false);
        if (onCancel) {
            onCancel(false);
        }
    };

    const handleRedirectAsset = () => {
        if (props.onRedirectEdit) {
            props.onRedirectEdit();
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header id="confirm-modal-header">
                <Modal.Title>{title}</Modal.Title>
                <AiOutlineCloseSquare
                    className="close-warning"
                    onClick={handleCancel}
                />
            </Modal.Header>
            <Modal.Body>
                <span>{detail}</span>
                {info.detailRedirect && (
                    <div className="handle-redirect">
                        <span>{info.detailRedirect}</span>
                        <span
                            className="redirect"
                            onClick={handleRedirectAsset}
                        >
                            {info.redirect}
                        </span>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmModalWarning;
