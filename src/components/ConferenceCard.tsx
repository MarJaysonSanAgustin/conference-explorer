import { Conference } from "@/types";
import ImageWithFallback from "./ImageWithFallback";
import CalendarIcon from "./icons/CalendarIcon";
import LocationIcon from "./icons/LocationIcon";

export default function ConferenceCard({
  conference,
}: {
  conference: Conference;
}) {
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
    .map((location) => location.name)
    .join(" & ");

  const locationImages = conference.locations.map((location) => location.image);

  return (
    <article key={conference.id} className="card">
      <div className="card__header">
        <h2 className="header__title">{conference.name}</h2>
        <time dateTime={conference.startDate} className="header__description">
          <CalendarIcon />
          {fmtStart}
          {fmtEnd}
        </time>

        {locations && (
          <span className="header__location">
            <LocationIcon />
            {locations}
          </span>
        )}
      </div>
      <div className="card__body">
        <p className="body__text">{conference.slogan}</p>
        <ImageWithFallback
          src={
            locationImages[0]?.url || "/images/fallback-conference-image.jpg"
          }
          fallbackSrc="/images/fallback-conference-image.jpg"
          alt={locationImages[0]?.title || "Default conference image"}
          width={300}
          height={200}
          className="body__img"
        />
      </div>
    </article>
  );
}
