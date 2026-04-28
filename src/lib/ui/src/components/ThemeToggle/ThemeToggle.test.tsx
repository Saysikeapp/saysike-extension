import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme, ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it('renders a radiogroup with aria-label="Theme"', () => {
    render(<ThemeToggle theme="light" setTheme={vi.fn()} />);
    expect(
      screen.getByRole("radiogroup", { name: "Theme" }),
    ).toBeInTheDocument();
  });

  it("renders exactly 3 radio buttons", () => {
    render(<ThemeToggle theme="light" setTheme={vi.fn()} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it.each(["light", "dark", "system"] as Theme[])(
    'renders a button with aria-label "Switch to %s theme"',
    (t) => {
      render(<ThemeToggle theme="light" setTheme={vi.fn()} />);
      expect(
        screen.getByRole("radio", { name: `Switch to ${t} theme` }),
      ).toBeInTheDocument();
    },
  );

  it('marks the light button as aria-checked when theme="light"', () => {
    render(<ThemeToggle theme="light" setTheme={vi.fn()} />);
    const group = screen.getByRole("radiogroup");
    expect(
      within(group).getByRole("radio", { name: "Switch to light theme" }),
    ).toHaveAttribute("aria-checked", "true");
    expect(
      within(group).getByRole("radio", { name: "Switch to dark theme" }),
    ).toHaveAttribute("aria-checked", "false");
    expect(
      within(group).getByRole("radio", { name: "Switch to system theme" }),
    ).toHaveAttribute("aria-checked", "false");
  });

  it('marks the dark button as aria-checked when theme="dark"', () => {
    render(<ThemeToggle theme="dark" setTheme={vi.fn()} />);
    expect(
      screen.getByRole("radio", { name: "Switch to dark theme" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it('marks the system button as aria-checked when theme="system"', () => {
    render(<ThemeToggle theme="system" setTheme={vi.fn()} />);
    expect(
      screen.getByRole("radio", { name: "Switch to system theme" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it('calls setTheme with "dark" when dark button is clicked', async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    render(<ThemeToggle theme="light" setTheme={setTheme} />);
    await user.click(
      screen.getByRole("radio", { name: "Switch to dark theme" }),
    );
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it('calls setTheme with "system" when system button is clicked', async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    render(<ThemeToggle theme="light" setTheme={setTheme} />);
    await user.click(
      screen.getByRole("radio", { name: "Switch to system theme" }),
    );
    expect(setTheme).toHaveBeenCalledWith("system");
  });

  it("merges className into the wrapper div", () => {
    render(
      <ThemeToggle theme="light" setTheme={vi.fn()} className="extra-class" />,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("extra-class");
  });

  it("active button has bg-surface-elevated class", () => {
    render(<ThemeToggle theme="dark" setTheme={vi.fn()} />);
    expect(
      screen.getByRole("radio", { name: "Switch to dark theme" }),
    ).toHaveClass("bg-surface-elevated");
  });
});
