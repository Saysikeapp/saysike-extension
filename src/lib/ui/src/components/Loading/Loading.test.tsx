import { render } from "@testing-library/react";
import { LoadingSpinner } from "./Loading";

describe("LoadingSpinner", () => {
  it("renders without crashing", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies a custom className to the inner spinner div", () => {
    const { container } = render(<LoadingSpinner className="custom-spin" />);
    const spinner = container.querySelector(".custom-spin");
    expect(spinner).toBeInTheDocument();
  });
});
