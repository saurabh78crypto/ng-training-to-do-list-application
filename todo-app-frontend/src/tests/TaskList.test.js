import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import * as taskService from '../services/taskService';

jest.mock('../services/taskService');

describe('TaskList Component', () => {
  beforeEach(() => {
    taskService.getTasks.mockResolvedValue({
      data: [
        { _id: '1', assignedTo: 'User A', status: 'Not Started', dueDate: '2024-09-20', priority: 'Low' },
        { _id: '2', assignedTo: 'User B', status: 'In Progress', dueDate: '2024-09-21', priority: 'High' },
      ],
    });
  });

  test('renders tasks correctly', async () => {
    render(<TaskList />);
    const userA = await screen.findByText(/User A/i);
    const userB = await screen.findByText(/User B/i);
    
    expect(userA).toBeInTheDocument();
    expect(userB).toBeInTheDocument();
  });

  test('search filters tasks', async () => {
    render(<TaskList />);
    await screen.findByText(/User A/i);
    
    const searchInput = screen.getByPlaceholderText(/Search Tasks/i);
    fireEvent.change(searchInput, { target: { value: 'User B' } });
    
    expect(screen.queryByText(/User A/i)).not.toBeInTheDocument();
    expect(screen.getByText(/User B/i)).toBeInTheDocument();
  });

  test('opens task form on new task button click', async () => {
    render(<TaskList />);
    
    const newTaskButton = screen.getByText(/New Task/i);
    fireEvent.click(newTaskButton);
    
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});
