import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '../components/DeleteModal';

describe('DeleteModal Component', () => {
  const mockConfirmDelete = jest.fn();
  const mockOnClose = jest.fn();
  const task = { title: 'Test Task' };
  
  test('renders delete confirmation', () => {
    render(<DeleteModal task={task} onClose={mockOnClose} confirmDelete={mockConfirmDelete} />);
    
    expect(screen.getByText(/Are you sure you want to delete the task:/i)).toBeInTheDocument();

  });

  test('calls confirmDelete on Yes button click', () => {
    render(<DeleteModal task={task} onClose={mockOnClose} confirmDelete={mockConfirmDelete} />);
    
    fireEvent.click(screen.getByText(/Yes/i));
    expect(mockConfirmDelete).toHaveBeenCalled();
  });

  test('calls onClose on No button click', () => {
    render(<DeleteModal task={task} onClose={mockOnClose} confirmDelete={mockConfirmDelete} />);
    
    fireEvent.click(screen.getByText(/No/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
