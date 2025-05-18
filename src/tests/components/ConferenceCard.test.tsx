/* eslint-disable @next/next/no-img-element */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../components/ImageWithFallback", () => {
  const MockImage: React.FC<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }> = ({ src, alt }) => (
    <img data-testid="conference-image" src={src} alt={alt} />
  );
  MockImage.displayName = "ImageWithFallback";
  return { __esModule: true, default: MockImage };
});

jest.mock("../../components/icons/CalendarIcon", () => {
  const MockCalendarIcon: React.FC = () => <svg data-testid="calendar-icon" />;
  MockCalendarIcon.displayName = "CalendarIcon";
  return { __esModule: true, default: MockCalendarIcon };
});

jest.mock("../../components/icons/LocationIcon", () => {
  const MockLocationIcon: React.FC = () => <svg data-testid="location-icon" />;
  MockLocationIcon.displayName = "LocationIcon";
  return { __esModule: true, default: MockLocationIcon };
});

import ConferenceCard from "../../components/ConferenceCard";
import type { Conference } from "@/types";

describe("ConferenceCard", () => {
  const baseConference: Omit<Conference, "endDate"> & { endDate?: string } = {
    id: "1",
    name: "Test Conference",
    startDate: "2024-06-01",
    slogan: "Innovate the future",
    organizer: { name: "Sasuke Uchiha" },
    series: { name: "Uchiha" },
    websiteUrl: "https://website.com",
    year: "2025",
    endDate: "2024-06-03",
    locations: [
      {
        name: "Makati",
        image: { url: "/makati.png", title: "Makati Image" },
        address: "somewhere",
        city: "Pasig",
        country: { code: "PH", name: "Philippines" },
      },
    ],
  };

  it("renders a single-day event correctly", () => {
    const conference: Conference = {
      ...baseConference,
      endDate: baseConference.startDate!,
    };

    render(<ConferenceCard conference={conference} />);

    // Title
    expect(
      screen.getByRole("heading", { level: 2, name: /Test Conference/ }),
    ).toHaveClass("header__title");

    // Time element: single date with year
    const start = new Date(conference.startDate);
    const expectedSingle = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timeEl = screen.getByText(expectedSingle, { selector: "time" });
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute("dateTime", conference.startDate);
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();

    // Location
    const locSpan = screen.getByText("Makati");
    expect(locSpan).toHaveClass("header__location");
    expect(screen.getByTestId("location-icon")).toBeInTheDocument();

    // Image
    const img = screen.getByTestId("conference-image");
    expect(img).toHaveAttribute("src", "/makati.png");
    expect(img).toHaveAttribute("alt", "Makati Image");

    // Root article
    expect(screen.getByRole("article")).toHaveClass("card");
  });

  it("renders a multi-day event correctly", () => {
    const conference: Conference = {
      ...baseConference,
      endDate: "2024-06-03",
    };

    render(<ConferenceCard conference={conference} />);

    // Compute expected format parts
    const start = new Date(conference.startDate);
    const end = new Date(conference.endDate);
    const fmtStart = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const fmtEnd = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Time element should contain "Jun 1 – Jun 3, 2024"
    const regex = new RegExp(`${fmtStart}\\s*[-–]\\s*${fmtEnd}`);
    const timeEl = screen.getByText(regex, { selector: "time" });
    expect(timeEl).toBeInTheDocument();
  });
});
