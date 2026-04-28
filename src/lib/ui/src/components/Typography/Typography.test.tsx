import { render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("Typography", () => {
  describe("Description", () => {
    it("renders a <p> element", () => {
      render(<Typography.Description>Text</Typography.Description>);
      expect(screen.getByText("Text").tagName).toBe("P");
    });
    it("forwards className", () => {
      render(
        <Typography.Description className="extra">Text</Typography.Description>,
      );
      expect(screen.getByText("Text")).toHaveClass("extra");
    });
    it("renders children", () => {
      render(<Typography.Description>Hello</Typography.Description>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });
  });

  describe("Header", () => {
    it("renders an <h1> element", () => {
      render(<Typography.Header>Title</Typography.Header>);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
    it("forwards className", () => {
      render(<Typography.Header className="extra">Title</Typography.Header>);
      expect(screen.getByRole("heading")).toHaveClass("extra");
    });
    it("renders children", () => {
      render(<Typography.Header>Page Title</Typography.Header>);
      expect(screen.getByText("Page Title")).toBeInTheDocument();
    });
  });

  describe("HelperText", () => {
    it('renders a div with role="alert"', () => {
      render(<Typography.HelperText>Help</Typography.HelperText>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    it('applies text-success class when state="success"', () => {
      render(<Typography.HelperText state="success">OK</Typography.HelperText>);
      expect(screen.getByRole("alert")).toHaveClass("text-success");
    });
    it('applies text-warning class when state="warning"', () => {
      render(
        <Typography.HelperText state="warning">Warn</Typography.HelperText>,
      );
      expect(screen.getByRole("alert")).toHaveClass("text-warning");
    });
    it('applies text-danger class when state="error"', () => {
      render(
        <Typography.HelperText state="error">Error</Typography.HelperText>,
      );
      expect(screen.getByRole("alert")).toHaveClass("text-danger");
    });
    it("does not apply state class when no state given", () => {
      render(<Typography.HelperText>Neutral</Typography.HelperText>);
      const el = screen.getByRole("alert");
      expect(el).not.toHaveClass("text-success");
      expect(el).not.toHaveClass("text-warning");
      expect(el).not.toHaveClass("text-danger");
    });
    it("forwards className", () => {
      render(
        <Typography.HelperText className="extra">Help</Typography.HelperText>,
      );
      expect(screen.getByRole("alert")).toHaveClass("extra");
    });
    it("renders children", () => {
      render(<Typography.HelperText>Helper message</Typography.HelperText>);
      expect(screen.getByText("Helper message")).toBeInTheDocument();
    });
  });

  describe("Price", () => {
    it("renders a <span> element", () => {
      render(<Typography.Price>£9.99</Typography.Price>);
      expect(screen.getByText("£9.99").tagName).toBe("SPAN");
    });
    it("renders children", () => {
      render(<Typography.Price>£19.99</Typography.Price>);
      expect(screen.getByText("£19.99")).toBeInTheDocument();
    });
  });

  describe("RowHeader", () => {
    it("renders an <h2> element", () => {
      render(<Typography.RowHeader>Row</Typography.RowHeader>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });
    it("forwards className", () => {
      render(
        <Typography.RowHeader className="extra">Row</Typography.RowHeader>,
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveClass("extra");
    });
    it("renders children", () => {
      render(<Typography.RowHeader>Section</Typography.RowHeader>);
      expect(screen.getByText("Section")).toBeInTheDocument();
    });
  });

  describe("RowTitle", () => {
    it("renders an <h2> element", () => {
      render(<Typography.RowTitle>Title</Typography.RowTitle>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });
    it("forwards className", () => {
      render(
        <Typography.RowTitle className="extra">Title</Typography.RowTitle>,
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveClass("extra");
    });
    it("renders children", () => {
      render(<Typography.RowTitle>Codes & Deals</Typography.RowTitle>);
      expect(screen.getByText("Codes & Deals")).toBeInTheDocument();
    });
  });

  describe("SmallDescription", () => {
    it("renders a <p> element", () => {
      render(<Typography.SmallDescription>Small</Typography.SmallDescription>);
      expect(screen.getByText("Small").tagName).toBe("P");
    });
    it("renders children", () => {
      render(
        <Typography.SmallDescription>Small text</Typography.SmallDescription>,
      );
      expect(screen.getByText("Small text")).toBeInTheDocument();
    });
  });

  describe("SubProduct", () => {
    it("renders a <p> element", () => {
      render(<Typography.SubProduct>Sub</Typography.SubProduct>);
      expect(screen.getByText("Sub").tagName).toBe("P");
    });
    it("renders children", () => {
      render(<Typography.SubProduct>Product name</Typography.SubProduct>);
      expect(screen.getByText("Product name")).toBeInTheDocument();
    });
  });
});
