import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import InterestRateChart from '../InterestRateChart'

jest.mock('../Context/RequiredDataProvider', () => ({
  useRequiredDataContext: () => ({
    states: { 'CA': 'California' },
    RateStructure: { 'fixed': 'Fixed' },
    LoanTerm: { '30': '30 years' },
    LoanType: { 'conventional': 'Conventional' },
    ArmType: { '5-1': '5/1' },
  }),
}));


jest.mock('axios');

jest.mock('react-apexcharts', () => {
  return function DummyChart() {
    return <div data-testid="mock-chart">Mock Chart</div>;
  };
});

describe('InterestRateChart Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { data: { '3.5': 10, '4.0': 20 } } });
  });

  test('renders without crashing', async () => {
    render(<InterestRateChart />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
    });
  });

  test('displays house price input', () => {
    render(<InterestRateChart />);
    expect(screen.getByText(/House Price/i)).toBeInTheDocument();
  });

  test('displays loan amount', () => {
    render(<InterestRateChart />);
    expect(screen.getByText('$180,000')).toBeInTheDocument();
  });

  test('displays state dropdown', () => {
    render(<InterestRateChart />);
    expect(screen.getByText(/Select State/i)).toBeInTheDocument();
  });

  test('displays rate type radio buttons', () => {
    render(<InterestRateChart />);
    expect(screen.getByText(/Rate Type/i)).toBeInTheDocument();
  });

  test('displays loan term radio buttons', () => {
    render(<InterestRateChart />);
    expect(screen.getByText(/Loan Term/i)).toBeInTheDocument();
  });

  test('displays loan type radio buttons', () => {
    render(<InterestRateChart />);
    expect(screen.getByText(/Loan Type/i)).toBeInTheDocument();
  });

  test('fetches data on component mount', async () => {
    render(<InterestRateChart />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});