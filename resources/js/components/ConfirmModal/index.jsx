import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './style.scss';

const ConfirmModal = (props) => {
    const { info, showModal, onCancel, onConfirm } = props;
    const { title, detail, contentBtn, cancelBtn } = info;
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

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header id="confirm-modal-header">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{detail}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleConfirm}>
                    {contentBtn}
                </Button>
                <Button variant="primary" onClick={handleCancel}>
                    {cancelBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
