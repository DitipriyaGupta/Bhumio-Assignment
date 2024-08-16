import React from 'react';
import { render, screen } from '@testing-library/react';
import RequiredDataProvider, { useRequiredDataContext } from '../../Context/RequiredDataProvider';

const TestComponent = () => {
  const { states, RateStructure, LoanTerm, LoanType, ArmType } = useRequiredDataContext();
  
  return (
    <div>
      <p>State: {states["California"]}</p>
      <p>Rate Structure: {RateStructure["Fixed"]}</p>
      <p>Loan Term: {LoanTerm["30 Years"]}</p>
      <p>Loan Type: {LoanType["Conventional"]}</p>
      <p>Arm Type: {ArmType["5/1"]}</p>
    </div>
  );
};

describe('RequiredDataProvider', () => {
  test('provides the correct context values', () => {
    render(
      <RequiredDataProvider>
        <TestComponent />
      </RequiredDataProvider>
    );

    expect(screen.getByText('State: CA')).toBeInTheDocument();
    expect(screen.getByText('Rate Structure: fixed')).toBeInTheDocument();
    expect(screen.getByText('Loan Term: 30')).toBeInTheDocument();
    expect(screen.getByText('Loan Type: conf')).toBeInTheDocument();
    expect(screen.getByText('Arm Type: 5-1')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <RequiredDataProvider>
        <div>Test Child</div>
      </RequiredDataProvider>
    );

    expect(container.textContent).toBe('Test Child');
  });
});
