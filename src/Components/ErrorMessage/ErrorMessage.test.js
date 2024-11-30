import ErrorMessage from "./ErrorMessage";
import { render, screen } from "@testing-library/react";

describe("ErrorMessage Component", () => {
  const props = {
    message: "Something went wrong, please try later.",
  };

  it("Should display the component correctly when the message passed as prop", () => {
    render(<ErrorMessage {...props} />);
    expect(screen.getByText("Something went wrong, please try later.")).toBeInTheDocument();
  });

  it("Should not display the component if message is not passed", () => {
    render(<ErrorMessage />);
    expect(screen.queryByText("Something went wrong, please try later.")).not.toBeInTheDocument();
  });
});
