import { render, fireEvent, screen } from "@testing-library/react";
import FormView from "./FormView";

describe("FormView Component", () => {
  it("renders the form with correct inputs and labels", () => {
    render(<FormView />);

    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i);
    const cvcInput = screen.getByLabelText(/CVC/i);
    const expiryInput = screen.getByLabelText(/Expiry/i);

    expect(cardNumberInput).toBeInTheDocument();
    expect(cvcInput).toBeInTheDocument();
    expect(expiryInput).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<FormView />);

    const submitButton = screen.getByText("Submit");

    expect(submitButton).toBeInTheDocument();
  });

  it("validates form on submit", () => {
    render(<FormView />);

    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i) as HTMLInputElement;
    const cvcInput = screen.getByLabelText(/CVC/i) as HTMLInputElement;
    const expiryInput = screen.getByLabelText(/Expiry/i) as HTMLInputElement;
    const submitButton = screen.getByText("Submit");

    fireEvent.change(cardNumberInput, {target: { value: "1234567812345678" } });
    fireEvent.change(cvcInput, { target: { value: "123" } });
    fireEvent.change(expiryInput, { target: { value: "2024-01" } });

    fireEvent.click(submitButton);

    expect(cardNumberInput.value).toBe("");
    expect(cvcInput.value).toBe("");
    expect(expiryInput.value).toBe("");

    const cardNumberErrorMessage = screen.queryByText("Card number must be 16 digits.");
    const cvcErrorMessage = screen.queryByText("CVC must be 3 digits.");
    const expiryErrorMessage = screen.queryByText("Expiry date must not be in the past.");

    expect(cardNumberErrorMessage).not.toBeInTheDocument();
    expect(cvcErrorMessage).not.toBeInTheDocument();
    expect(expiryErrorMessage).not.toBeInTheDocument();
  });

  it("displays errror messages for invalid input", () => {
    render(<FormView />);

    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i) as HTMLInputElement;
    const cvcInput = screen.getByLabelText(/CVC/i) as HTMLInputElement;
    const expiryInput = screen.getByLabelText(/Expiry/i) as HTMLInputElement;
    const submitButton = screen.getByText("Submit");

    fireEvent.change(cardNumberInput, { target: { value: "12345678" } });
    fireEvent.change(cvcInput, { target: { value: "1" } });
    fireEvent.change(expiryInput, { target: { value: "2022-01" } });

    fireEvent.click(submitButton);

    const cardNumberErrorMessage = screen.queryByText("Card number must be 16 digits.");
    const cvcErrorMessage = screen.queryByText("CVC must be 3 digits.");
    const expiryErrorMessage = screen.queryByText("Expiry date must not be in the past.");

    expect(cardNumberErrorMessage).toBeInTheDocument;
    expect(cvcErrorMessage).toBeInTheDocument;
    expect(expiryErrorMessage).toBeInTheDocument;

    expect(cardNumberInput.value).toBe("12345678");
    expect(cvcInput.value).toBe("1");
    expect(expiryInput.value).toBe("2022-01");
  });
});
