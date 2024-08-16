import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the InterestRateChart component
jest.mock('./Components/InterestRateChart', () => {
  return function DummyInterestRateChart() {
    return <div data-testid="mock-interest-rate-chart">Mock Interest Rate Chart</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('mock-interest-rate-chart')).toBeInTheDocument();
  });

  test('has the correct background class', () => {
    render(<App />);
    const appDiv = screen.getByTestId('mock-interest-rate-chart').parentElement;
    expect(appDiv).toHaveClass('h-screen');
    expect(appDiv).toHaveClass('bg-[#e9e7e71a]');
  });

  test('only renders InterestRateChart component', () => {
    render(<App />);
    const appDiv = screen.getByTestId('mock-interest-rate-chart').parentElement;
    expect(appDiv.children.length).toBe(1);
  });
});