import React from 'react';
import { render, screen } from '@testing-library/react';
import DatePickerComponent from '../components/DatePickerComponent';
import { useDatePickerStore } from '../store';

// Mock the store
jest.mock('../store', () => ({
  useDatePickerStore: jest.fn(),
}));

describe('DatePickerComponent', () => {
  const mockUseDatePickerStore = useDatePickerStore as jest.MockedFunction<typeof useDatePickerStore>;

  beforeEach(() => {
    // Mock return values for the store hook
    mockUseDatePickerStore.mockReturnValue({
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31'),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      recurrenceType: 'daily',
      setRecurrenceType: jest.fn(),
      interval: 1,
      setInterval: jest.fn(),
      generateDates: jest.fn(),
      recurringDates: [new Date('2023-01-01'), new Date('2023-01-02')],
    });
  });

  it('renders the component correctly', () => {
    render(<DatePickerComponent />);
    
    expect(screen.getByText('Date Picker Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Select Date Range')).toBeInTheDocument();
    expect(screen.getByText('Recurrence Settings')).toBeInTheDocument();
    expect(screen.getByText('Recurring Dates Preview')).toBeInTheDocument();
  });

  it('calls generateDates when component mounts', () => {
    render(<DatePickerComponent />);
    
    expect(mockUseDatePickerStore().generateDates).toHaveBeenCalledTimes(1);
  });
});
