import Rates from "./Rates";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { getForexRate } from "../../Services/ForexServices";

jest.mock("../../Services/ForexServices", () => ({
  getForexRate: jest.fn(),
}));

describe("Rates Component", () => {
  it("Should render the component", async () => {
    render(<Rates />);
    expect(await screen.findByText("Currency Conversion")).toBeInTheDocument();
  });

  it("Should call the service and display the forex rate correctly", async () => {
    getForexRate.mockResolvedValue({ retailRate: 0.7456 });
    render(<Rates />);
    await waitFor(() => expect(getForexRate).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("0.7456")).toBeInTheDocument();
  });

  it("Should handle the scenario when service not returned with data", async () => {
    getForexRate.mockResolvedValue({});
    render(<Rates />);
    await waitFor(() => expect(getForexRate).toHaveBeenCalledTimes(1));
    expect(
      await screen.findByText("Something went wrong, please try later.")
    ).toBeInTheDocument();
  });

  it("Should calculate the amount without markup correctly", async () => {
    getForexRate.mockResolvedValue({ retailRate: 0.7456 });
    render(<Rates />);
    await waitFor(() => expect(getForexRate).toHaveBeenCalledTimes(1));
    const sendText = screen.getByTestId("send-amount");
    fireEvent.change(sendText, { target: { value: "100" } });
    await waitFor(() => {
      expect(
        screen.getByText("Amount without markup = 74.56")
      ).toBeInTheDocument();
    });
  });

  it("Should calculate the amount with markup correctly", async () => {
    getForexRate.mockResolvedValue({ retailRate: 0.7456 });
    render(<Rates />);
    await waitFor(() => expect(getForexRate).toHaveBeenCalledTimes(1));
    const sendText = screen.getByTestId("send-amount");
    fireEvent.change(sendText, { target: { value: "100" } });
    await waitFor(() => {
      expect(screen.getByTestId("receiving-amount").value).toBe("74.1872");
    });
  });
});
