import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ task, onClose, confirmDelete }) => {
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the task: <strong>{task.title}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
