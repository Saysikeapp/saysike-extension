import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { ReactNode } from "react";

vi.mock("react-svg", () => ({
  ReactSVG: ({ src }: { src: string }): ReactNode => (
    <div data-testid="icon" data-src={src} />
  ),
}));

function SimpleAccordion(): React.ReactElement {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("all triggers are collapsed by default (aria-expanded=false)", () => {
    render(<SimpleAccordion />);
    screen
      .getAllByRole("button")
      .forEach((btn) => expect(btn).toHaveAttribute("aria-expanded", "false"));
  });

  it("clicking AccordionTrigger opens the content", async () => {
    const user = userEvent.setup();
    render(<SimpleAccordion />);
    await user.click(screen.getByRole("button", { name: /Trigger 1/i }));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("clicking an open trigger collapses it again (collapsible)", async () => {
    const user = userEvent.setup();
    render(<SimpleAccordion />);
    const trigger = screen.getByRole("button", { name: /Trigger 1/i });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opening item B when A is open closes A (type=single)", async () => {
    const user = userEvent.setup();
    render(<SimpleAccordion />);
    const triggerA = screen.getByRole("button", { name: /Trigger 1/i });
    await user.click(triggerA);
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByRole("button", { name: /Trigger 2/i }));
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
  });

  it("AccordionTrigger renders the chevron icon", () => {
    render(<SimpleAccordion />);
    expect(screen.getAllByTestId("icon").length).toBeGreaterThan(0);
  });

  it("AccordionContent renders children when opened", async () => {
    const user = userEvent.setup();
    render(<SimpleAccordion />);
    await user.click(screen.getByRole("button", { name: /Trigger 1/i }));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
