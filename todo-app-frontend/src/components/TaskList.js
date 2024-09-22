import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Pagination } from 'react-bootstrap';
import { getTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm';
import DeleteModal from './DeleteModal';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks!', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredTasks(
      tasks.filter(task =>
        task.assignedTo.toLowerCase().includes(query.toLowerCase()) ||
        task.status.toLowerCase().includes(query.toLowerCase()) ||
        formatDate(task.dueDate).includes(query.toLowerCase()) || 
        task.priority.toLowerCase().includes(query.toLowerCase())
      )
    );
    setCurrentPage(1); 
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedTask) {
        await deleteTask(selectedTask._id);
        setShowDeleteModal(false);
        fetchTasks();
        console.log('Task deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting task!', error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate total pages and paginated tasks
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search Tasks"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="fas fa-plus"></i> New Task
        </Button>
      </div>

      <Table striped bordered hover responsive className="table-custom">
        <thead className="thead-dark">
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{formatDate(task.dueDate)}</td> 
              <td>{task.priority}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <i className="fas fa-ellipsis-v"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(task)}>
                      <i className="fas fa-edit"></i> Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(task)}>
                      <i className="fas fa-trash"></i> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <TaskForm task={selectedTask} onClose={() => setShowForm(false)} fetchTasks={fetchTasks} />
      )}
      {showDeleteModal && (
        <DeleteModal task={selectedTask} onClose={() => setShowDeleteModal(false)} confirmDelete={confirmDelete} />
      )}

      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.Prev 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1} 
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => paginate(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default TaskList;
