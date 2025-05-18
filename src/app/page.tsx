import ConferenceCard from "@/components/ConferenceCard";
import { getAllConferencesQuery } from "@/constants/queries";
import { getClient } from "@/lib/appolo-client";
import Link from "next/link";
import { FetchConferenceResponse } from "@/types";

type SearchParams = Promise<{ sortBy?: "name" | "date" }>;

export default async function Index({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { sortBy } = await searchParams;

  const { data, loading, error } =
    await getClient().query<FetchConferenceResponse>({
      query: getAllConferencesQuery,
    });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error loading conferences</h1>;

  const sorted = [...data!.conferences];

  if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "date") {
    sorted.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  }

  return (
    <div className="details-container">
      <div className="sort-controls">
        <Link
          href={{ pathname: "/", query: { sortBy: "date" } }}
          className="button"
        >
          Sort by Date
        </Link>

        <Link
          href={{ pathname: "/", query: { sortBy: "name" } }}
          className="button"
        >
          Sort by Name
        </Link>

        <Link href={{ pathname: "/" }} className="button">
          Reset
        </Link>
      </div>

      <div className="container">
        {sorted.map((conference) => (
          <Link
            key={conference.id}
            href={`/${conference.id}`}
            style={{ textDecoration: "none" }}
          >
            <ConferenceCard conference={conference} />
          </Link>
        ))}
      </div>
    </div>
  );
}
