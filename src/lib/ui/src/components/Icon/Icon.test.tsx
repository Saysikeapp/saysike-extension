import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Icon from "./Icon";
import { ReactNode } from "react";

const reactSvgMock = vi.fn(({ src }: { src: string }) => (
  <div data-testid="icon-svg" data-src={src} />
));

vi.mock("react-svg", () => ({
  ReactSVG: (props: { src: string }): ReactNode => reactSvgMock(props),
}));

afterEach(() => {
  // Remove any link tags added by the Icon component
  document.head
    .querySelectorAll('link[href="https://cdn.saysike.com"]')
    .forEach((el) => el.remove());
});

describe("Icon", () => {
  it("auto-prefixes a bare icon name with 'solid/'", () => {
    render(<Icon src="exit.svg" />);
    expect(reactSvgMock).toHaveBeenCalledWith(
      expect.objectContaining({
        src: "https://cdn.saysike.com/solid/exit.svg",
      }),
    );
  });

  it("does not double-prefix a path that already has a folder", () => {
    render(<Icon src="color/label.svg" />);
    expect(reactSvgMock).toHaveBeenCalledWith(
      expect.objectContaining({
        src: "https://cdn.saysike.com/color/label.svg",
      }),
    );
  });

  it("applies width and height from size prop (size=4 → 16x16)", () => {
    const { container } = render(<Icon src="exit.svg" size={4} />);
    const wrapper = container.querySelector(".icon");
    expect(wrapper).toHaveStyle({ width: "16px", height: "16px" });
  });

  it("applies width and height from size prop (size=10 → 40x40)", () => {
    const { container } = render(<Icon src="exit.svg" size={10} />);
    const wrapper = container.querySelector(".icon");
    expect(wrapper).toHaveStyle({ width: "40px", height: "40px" });
  });

  it("applies className to the wrapper div", () => {
    const { container } = render(<Icon src="exit.svg" className="my-icon" />);
    expect(container.querySelector(".my-icon")).toBeInTheDocument();
  });

  it("adds cursor-pointer class when onClick is provided", () => {
    const { container } = render(<Icon src="exit.svg" onClick={vi.fn()} />);
    expect(container.querySelector(".cursor-pointer")).toBeInTheDocument();
  });

  it("calls onClick when wrapper is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<Icon src="exit.svg" onClick={onClick} />);
    await user.click(container.querySelector(".icon")!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("adds preconnect and dns-prefetch link tags to document.head on mount", () => {
    render(<Icon src="exit.svg" />);
    const preconnect = document.head.querySelector(
      'link[rel="preconnect"][href="https://cdn.saysike.com"]',
    );
    const dnsPrefetch = document.head.querySelector(
      'link[rel="dns-prefetch"][href="https://cdn.saysike.com"]',
    );
    expect(preconnect).toBeInTheDocument();
    expect(dnsPrefetch).toBeInTheDocument();
  });

  it("does not add duplicate link tags on re-render", () => {
    const { rerender } = render(<Icon src="exit.svg" />);
    rerender(<Icon src="exit.svg" />);
    const preconnects = document.head.querySelectorAll(
      'link[rel="preconnect"][href="https://cdn.saysike.com"]',
    );
    expect(preconnects.length).toBe(1);
  });
});
