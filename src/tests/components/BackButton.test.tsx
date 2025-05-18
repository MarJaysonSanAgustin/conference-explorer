import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  const MockLink: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "Link";
  return { __esModule: true, default: MockLink };
});

jest.mock("../../components/icons/ArrowLeftIcon", () => {
  const MockArrowLeftIcon: React.FC = () => <svg data-testid="arrow-icon" />;
  MockArrowLeftIcon.displayName = "ArrowLeftIcon";
  return { __esModule: true, default: MockArrowLeftIcon };
});

import BackButton from "../../components/BackButton";

describe("BackButton", () => {
  it("renders a link back to “/” with correct text and icon", () => {
    render(<BackButton />);

    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute("href", "/");

    expect(link).toHaveClass("button");

    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();

    expect(link).toHaveTextContent("Back");
  });

  it('wraps the link inside a container with class "flex"', () => {
    const { container } = render(<BackButton />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex");
  });
});
