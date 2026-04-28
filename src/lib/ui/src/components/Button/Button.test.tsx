import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, ReactNode } from "react";
import { Button } from "./Button";

vi.mock("react-svg", () => ({
  ReactSVG: ({ src }: { src: string }): ReactNode => (
    <div data-testid="icon" data-src={src} />
  ),
}));

describe("Button", () => {
  it("renders children text", () => {
    render(<Button type="button">Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it('defaults type to "submit" when no type prop is given', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it('preserves explicit type="button"', () => {
    render(<Button type="button">Action</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="button" onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="button" disabled onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is disabled when isLoading is true", () => {
    render(
      <Button type="button" isLoading>
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders LoadingSpinner instead of children when isLoading", () => {
    render(
      <Button type="button" isLoading>
        Save
      </Button>,
    );
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("does not fire onClick when isLoading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="button" isLoading onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("merges className prop via cn()", () => {
    render(
      <Button type="button" className="my-custom-class">
        Styled
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button type="button" ref={ref}>
        Ref
      </Button>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders an anchor element when asChild=true with an <a> child", () => {
    render(
      <Button asChild>
        <a href="/path">Link</a>
      </Button>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Link" })).toBeInTheDocument();
  });

  it("renders without crashing for variant=secondary", () => {
    render(
      <Button type="button" variant="secondary">
        Secondary
      </Button>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders without crashing for size=lg", () => {
    render(
      <Button type="button" size="lg">
        Large
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });
});
