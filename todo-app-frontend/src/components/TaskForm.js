import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTask, updateTask } from '../services/taskService'; 

const TaskForm = ({ task, onClose, fetchTasks }) => {
  const initialFormData = {
    assignedTo: task ? task.assignedTo : '',
    description: task ? task.description : '',
    dueDate: task ? task.dueDate : '',
    priority: task ? task.priority : 'Low',
    status: task ? task.status : 'Not Started',
  };

  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task._id, formData);
      } else {
        await addTask(formData);
      }
      fetchTasks(); 
      resetForm();  
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleClose = () => {
    resetForm(); 
    onClose();
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='assignedTo'>Assigned To</Form.Label>
            <Form.Control
              id="assignedTo"
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="dueDate">Due Date</Form.Label>
            <Form.Control
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="priority">Priority</Form.Label>
            <Form.Control
              id="priority"
              as="select"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Control
              id="status"
              as="select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>{' '}
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
