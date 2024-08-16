import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomRadioComponent from "../CustomRadioComponent";
import '@testing-library/jest-dom/extend-expect';

describe("CustomRadioComponent", () => {
  const mockOnChange = jest.fn();

  const options = {
    Fixed: "fixed",
    Variable: "variable",
    Adjustable: "adjustable"
  };

  test("renders the radio buttons with correct label", () => {
    render(
      <CustomRadioComponent
        label="Rate Type"
        value=""
        onChange={mockOnChange}
        options={options}
      />
    );

    expect(screen.getByText("Rate Type")).toBeInTheDocument();

    Object.keys(options).forEach((key) => {
      expect(screen.getByLabelText(key)).toBeInTheDocument();
    });
  });

  test("calls onChange when a radio button is selected", () => {
    render(
      <CustomRadioComponent
        label="Rate Type"
        value=""
        onChange={mockOnChange}
        options={options}
      />
    );

    fireEvent.click(screen.getByLabelText("Fixed"));

    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), "fixed");
  });

  test("renders with the correct selected value", () => {
    render(
      <CustomRadioComponent
        label="Rate Type"
        value="variable"
        onChange={mockOnChange}
        options={options}
      />
    );

    expect(screen.getByLabelText("Variable")).toBeChecked();
  });

  test("renders multiple CustomRadioComponents correctly", () => {
    const loanTermOptions = {
      "10 years": "10",
      "15 years": "15",
      "30 years": "30"
    };

    render(
      <div>
        <CustomRadioComponent
          label="Rate Type"
          value="fixed"
          onChange={mockOnChange}
          options={options}
        />
        <CustomRadioComponent
          label="Loan Term"
          value="15"
          onChange={mockOnChange}
          options={loanTermOptions}
        />
      </div>
    );

    expect(screen.getByText("Rate Type")).toBeInTheDocument();
    expect(screen.getByText("Loan Term")).toBeInTheDocument();

    expect(screen.getByLabelText("Fixed")).toBeChecked();
    expect(screen.getByLabelText("15 years")).toBeChecked();
  });
});
