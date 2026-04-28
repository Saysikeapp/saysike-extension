import { render, screen } from "@testing-library/react";
import { InputLabel } from "./InputLabel";

describe("InputLabel", () => {
  it("renders a <label> element", () => {
    render(<InputLabel>My Field</InputLabel>);
    expect(screen.getByText("My Field").tagName).toBe("LABEL");
  });

  it("sets the for attribute via htmlFor", () => {
    render(<InputLabel htmlFor="email-input">Email</InputLabel>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
  });

  it("renders children", () => {
    render(<InputLabel>Field label</InputLabel>);
    expect(screen.getByText("Field label")).toBeInTheDocument();
  });

  it("merges className with defaults via cn()", () => {
    render(<InputLabel className="extra-class">Label</InputLabel>);
    expect(screen.getByText("Label")).toHaveClass("extra-class");
  });
});
