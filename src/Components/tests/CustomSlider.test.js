import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSlider from "../CustomSlider";
import '@testing-library/jest-dom/extend-expect';

describe("CustomSlider Component", () => {
  const mockOnRangeChange = jest.fn();

  test("renders the slider with correct initial value", () => {
    render(<CustomSlider onRangeChange={mockOnRangeChange} />);

    expect(screen.getByRole("slider")).toBeInTheDocument();

    expect(screen.getByText("720 - 739")).toBeInTheDocument();
  });

  test("calls onRangeChange with correct values when slider is moved", () => {
    render(<CustomSlider onRangeChange={mockOnRangeChange} />);

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: 850 } });

    expect(screen.getByText("847 - 850")).toBeInTheDocument();

    expect(mockOnRangeChange).toHaveBeenCalledWith(847, 850);
  });

  test("displays correct range values when slider value is at the maximum", () => {
    render(<CustomSlider onRangeChange={mockOnRangeChange} />);

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: 850 } });

    expect(screen.getByText("847 - 850")).toBeInTheDocument();

    expect(mockOnRangeChange).toHaveBeenCalledWith(847, 850);
  });
});
