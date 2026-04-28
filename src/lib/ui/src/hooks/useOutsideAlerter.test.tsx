import { render, screen } from "@testing-library/react";
import { ReactNode, useRef } from "react";
import { useOutsideAlerter } from "./useOutsideAlerter";

function Fixture({ onOutside }: { onOutside: () => void }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, onOutside);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe("useOutsideAlerter", () => {
  it("does NOT call onOutside when mousedown fires inside the element", () => {
    const onOutside = vi.fn();
    render(<Fixture onOutside={onOutside} />);
    screen
      .getByTestId("inside")
      .dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(onOutside).not.toHaveBeenCalled();
  });

  it("calls onOutside when mousedown fires outside the element", () => {
    const onOutside = vi.fn();
    render(<Fixture onOutside={onOutside} />);
    screen
      .getByTestId("outside")
      .dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("calls onOutside when touchstart fires outside the element", () => {
    const onOutside = vi.fn();
    render(<Fixture onOutside={onOutside} />);
    screen
      .getByTestId("outside")
      .dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("does not call onOutside after the component unmounts", () => {
    const onOutside = vi.fn();
    const { unmount } = render(<Fixture onOutside={onOutside} />);
    unmount();
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(onOutside).not.toHaveBeenCalled();
  });
});
