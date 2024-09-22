import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import * as taskService from '../services/taskService';

jest.mock('../services/taskService');

describe('TaskForm Component', () => {
  const mockFetchTasks = jest.fn();

  test('renders form fields correctly', () => {
    render(<TaskForm onClose={() => {}} fetchTasks={mockFetchTasks} />);
    
    expect(screen.getByLabelText(/Assigned To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    taskService.addTask.mockResolvedValueOnce();
    render(<TaskForm onClose={() => {}} fetchTasks={mockFetchTasks} />);
    
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Assigned To/i), { target: { value: 'User A' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test task' } });
      fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-09-22' } });
      fireEvent.click(screen.getByText(/Save/i));
    });

    expect(mockFetchTasks).toHaveBeenCalled(); 
  });
});
