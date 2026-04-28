import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";
import { ReactNode } from "react";

vi.mock("react-svg", () => ({
  ReactSVG: ({ src }: { src: string }): ReactNode => (
    <div data-testid="icon" data-src={src} />
  ),
}));

const activateMock = vi.fn();
const deactivateMock = vi.fn();

vi.mock("focus-trap", () => ({
  createFocusTrap: (): {
    activate: typeof activateMock;
    deactivate: typeof deactivateMock;
  } => ({
    activate: activateMock,
    deactivate: deactivateMock,
  }),
}));

describe("Modal.Overlay", () => {
  it("renders nothing when showModal is false", () => {
    const { container } = render(
      <Modal.Overlay showModal={false}>Content</Modal.Overlay>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders into document.body when showModal is true", () => {
    render(<Modal.Overlay showModal={true}>Content</Modal.Overlay>);
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('has role="dialog" and aria-modal="true" when showModal is true', () => {
    render(<Modal.Overlay showModal={true}>Content</Modal.Overlay>);
    const dialog = document.body.querySelector('[role="dialog"]')!;
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("forwards className to the section element", () => {
    render(
      <Modal.Overlay showModal={true} className="extra-class">
        Content
      </Modal.Overlay>,
    );
    const dialog = document.body.querySelector('[role="dialog"]')!;
    expect(dialog).toHaveClass("extra-class");
  });
});

describe("Modal.Panel", () => {
  it("renders children", () => {
    render(<Modal.Panel onClose={vi.fn()}>Panel Content</Modal.Panel>);
    expect(screen.getByText("Panel Content")).toBeInTheDocument();
  });

  it("adds overflow-hidden to document.body on mount", () => {
    render(<Modal.Panel onClose={vi.fn()}>Content</Modal.Panel>);
    expect(document.body.classList.contains("overflow-hidden")).toBe(true);
  });

  it("removes overflow-hidden from document.body on unmount", () => {
    const { unmount } = render(
      <Modal.Panel onClose={vi.fn()}>Content</Modal.Panel>,
    );
    unmount();
    expect(document.body.classList.contains("overflow-hidden")).toBe(false);
  });

  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal.Panel onClose={onClose}>Content</Modal.Panel>);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when Escape is pressed and closeOnClickOutside=false", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal.Panel onClose={onClose} closeOnClickOutside={false}>
        Content
      </Modal.Panel>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has a close button with aria-label='Close modal'", () => {
    render(<Modal.Panel onClose={vi.fn()}>Content</Modal.Panel>);
    expect(
      screen.getByRole("button", { name: "Close modal" }),
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal.Panel onClose={onClose}>Content</Modal.Panel>);
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("activates the focus trap on mount", () => {
    render(<Modal.Panel onClose={vi.fn()}>Content</Modal.Panel>);
    expect(activateMock).toHaveBeenCalled();
  });

  it("deactivates the focus trap on unmount", () => {
    const { unmount } = render(
      <Modal.Panel onClose={vi.fn()}>Content</Modal.Panel>,
    );
    unmount();
    expect(deactivateMock).toHaveBeenCalled();
  });
});

describe("Modal.Title", () => {
  it("renders children in an h1 element", () => {
    render(<Modal.Title>Dialog Title</Modal.Title>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Dialog Title" }),
    ).toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<Modal.Title className="extra">Title</Modal.Title>);
    expect(screen.getByRole("heading")).toHaveClass("extra");
  });
});

describe("Modal.Body", () => {
  it("renders children", () => {
    render(<Modal.Body>Body content</Modal.Body>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(
      <Modal.Body className="extra">Body</Modal.Body>,
    );
    expect(container.querySelector("section")).toHaveClass("extra");
  });
});

describe("Modal.Footer", () => {
  it("renders children", () => {
    render(<Modal.Footer>Footer content</Modal.Footer>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(
      <Modal.Footer className="extra">Footer</Modal.Footer>,
    );
    expect(container.querySelector("section")).toHaveClass("extra");
  });
});
