import BackButton from "@/components/BackButton";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getConferenceByIdQuery } from "@/constants/queries";
import { getClient } from "@/lib/appolo-client";
import { FetchConferenceByIdResponse } from "@/types";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getClient().query<FetchConferenceByIdResponse>({
    query: getConferenceByIdQuery(id),
  });

  const { conference } = data;

  return {
    title: conference.name,
    description: conference?.slogan || "",
  };
}

export default async function DetailsPage({ params }: Props) {
  const { id } = await params;

  const { data } = await getClient().query<FetchConferenceByIdResponse>({
    query: getConferenceByIdQuery(id),
  });

  const { conference } = data;

  const start = new Date(conference.startDate);
  const end = new Date(conference.endDate);
  const isSingleDayEvent = end.getTime() === start.getTime();

  const fmtStart = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: isSingleDayEvent ? "numeric" : undefined,
  });

  const fmtEnd = isSingleDayEvent
    ? ""
    : ` – ${end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
  const locations = conference.locations
    .map(
      (location) =>
        `${location.name} | ${location.address}, ${location.city}, ${location.country.name}`,
    )
    .join(" & ");

  const locationImages = conference.locations.map((location) => location.image);

  if (data) {
    return (
      <div className="details-container">
        <BackButton />

        <div className="details">
          <ImageWithFallback
            src={
              locationImages[0]?.url || "/images/fallback-conference-image.jpg"
            }
            fallbackSrc="/images/fallback-conference-image.jpg"
            alt={locationImages[0]?.title || "Default conference image"}
            width={500}
            height={500}
            className="details__img"
          />
          <h1 className="details__title">{conference.name}</h1>

          <p>{conference.slogan}</p>

          <div className="details__header">
            <time dateTime={conference.startDate} className="description">
              <CalendarIcon />
              {fmtStart}
              {fmtEnd}
            </time>

            {locations && (
              <span className="description">
                <LocationIcon />
                {locations}
              </span>
            )}
          </div>

          <div className="details__additional">
            <div className="container">
              <h3>Organizer</h3>
              <p>{conference.organizer.name}</p>
            </div>
            <div className="container">
              <h3>Series</h3>
              <p>{conference.series.name}</p>
            </div>
            <div className="container">
              <h3>Link</h3>
              <a
                href={conference.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website URL
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
