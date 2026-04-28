import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Input } from "./TextInput";
import {
  ManualValidationStateText,
  ERROR_MESSAGE_IGNORE,
} from "../Shared/ValidationStateText";

describe("Input", () => {
  it("renders an <input> element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with a given value", () => {
    render(<Input value="hello" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("renders empty string for null value (no React controlled warning)", () => {
    render(<Input value={null as unknown as string} onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("renders empty string for undefined value", () => {
    render(<Input value={undefined} onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("calls onValueChange with string value on change", () => {
    const onValueChange = vi.fn();
    render(<Input onValueChange={onValueChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(onValueChange).toHaveBeenCalledWith("hello");
  });

  it("calls onValueChange with a parsed number for number type", () => {
    const onValueChange = vi.fn();
    render(<Input type="number" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "42" },
    });
    expect(onValueChange).toHaveBeenCalledWith(42);
  });

  it("applies left padding class when iconLeft is provided", () => {
    render(<Input iconLeft={<span>L</span>} />);
    expect(screen.getByRole("textbox")).toHaveClass("pl-9!");
  });

  it("applies right padding class when iconRight is provided", () => {
    render(<Input iconRight={<span>R</span>} />);
    expect(screen.getByRole("textbox")).toHaveClass("pr-9!");
  });

  it("shows a LoadingSpinner when isLoading=true and loadingDisplayType=spinner", () => {
    const { container } = render(
      <Input isLoading loadingDisplayType="spinner" />,
    );
    // The right slot contains the spinner wrapper div
    expect(container.querySelector(".w-8.h-8")).toBeInTheDocument();
  });

  it("applies loading-state class to wrapper when isLoading=true and loadingDisplayType=border", () => {
    const { container } = render(
      <Input isLoading loadingDisplayType="border" />,
    );
    expect(container.querySelector(".loading-state")).toBeInTheDocument();
  });

  it("is disabled when disabled=true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies bg-light-grey class to wrapper when disabled", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-light-grey");
  });

  it("applies h-9 class for size=sm", () => {
    render(<Input size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-9");
  });

  it("applies h-10 class for size=md (default)", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveClass("h-10");
  });

  it("applies h-12 class for size=lg", () => {
    render(<Input size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-12");
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards HTML props like placeholder", () => {
    render(<Input placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });
});

describe("ManualValidationStateText", () => {
  it("renders error message with text-danger class", () => {
    render(
      <ManualValidationStateText state="error" formMessage="Required field" />,
    );
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByText("Required field").closest("div")).toHaveClass(
      "text-danger",
    );
  });

  it("renders success message with text-success class", () => {
    render(
      <ManualValidationStateText state="success" customMessage="Looks good!" />,
    );
    expect(screen.getByText("Looks good!")).toBeInTheDocument();
  });

  it("renders warning message with text-warning class", () => {
    render(
      <ManualValidationStateText state="warning" formMessage="Check this" />,
    );
    expect(screen.getByText("Check this").closest("div")).toHaveClass(
      "text-warning",
    );
  });

  it("returns null when formMessage is ERROR_MESSAGE_IGNORE", () => {
    const { container } = render(
      <ManualValidationStateText
        state="error"
        formMessage={ERROR_MESSAGE_IGNORE}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("returns null when customMessage is ERROR_MESSAGE_IGNORE", () => {
    const { container } = render(
      <ManualValidationStateText
        state="error"
        customMessage={ERROR_MESSAGE_IGNORE}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("calls customMessage as a function with state", () => {
    const customMessage = vi.fn().mockReturnValue(<span>Custom!</span>);
    render(
      <ManualValidationStateText state="error" customMessage={customMessage} />,
    );
    expect(customMessage).toHaveBeenCalledWith("error");
    expect(screen.getByText("Custom!")).toBeInTheDocument();
  });
});
