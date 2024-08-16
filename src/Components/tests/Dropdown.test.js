import React from "react";
import { render, screen } from "@testing-library/react";
import Dropdown from "../Dropdown";
import '@testing-library/jest-dom/extend-expect';

describe("Dropdown Component", () => {
  const mockOnChange = jest.fn();
  const options = {
    Option1: "option1",
    Option2: "option2",
    Option3: "option3",
  };

  test("renders with the correct value", () => {
    render(
      <Dropdown
        label="Selected State"
        value="option2"
        onChange={mockOnChange}
        options={options}
      />
    );

    expect(screen.getByText("Option2")).toBeInTheDocument();
  });
});
