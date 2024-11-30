import InputField from "./InputField";
import { render, screen, fireEvent } from "@testing-library/react";

describe("InputField Component", () => {
  const mockInputSetText = jest.fn();
  const props = {
    id: "input-field",
    label: "Input Label",
    value: 0,
    setInputText: mockInputSetText,
    subTextLabel: "subText",
    subTextValue: 50,
    isDisabled: false,
  };

  it("Should render the InputField component correctly", () => {
    render(<InputField {...props} />);
    expect(screen.getByLabelText("Input Label")).toBeInTheDocument();
    const input = screen.getByTestId("input-field");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("subText = 50")).toBeInTheDocument();
  });

  it("Should call the setInputText when input value changes", () => {
    render(<InputField {...props} />);
    const input = screen.getByTestId("input-field");
    fireEvent.change(input, { target: { value: "100" } });
    expect(mockInputSetText).toHaveBeenCalledTimes(1);
    expect(mockInputSetText).toHaveBeenCalledWith("100");
  });

  it("Should be disabled if isDisabled is true", () => {
    render(<InputField {...props} isDisabled={true} />);
    const input = screen.getByTestId("input-field");
    expect(input).toBeDisabled();
  });

  it("Should display subTextLabel and subTextValue when passed", () => {
    render(<InputField {...props} />);
    expect(screen.getByText("subText = 50")).toBeInTheDocument();
  });
});
