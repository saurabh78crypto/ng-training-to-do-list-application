import React from 'react';
import TaskList from './components/TaskList';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <TaskList />
      <ToastContainer />
    </div>
  );
}

export default App;
