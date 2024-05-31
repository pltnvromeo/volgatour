import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalWarning = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                Перед бронированием вам необходимо войти в профиль.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Link to="/login">
                    <Button variant="primary">
                        Войти
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWarning;