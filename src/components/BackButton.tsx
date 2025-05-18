import Link from "next/link";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

export default function BackButton() {
  return (
    <div className="flex">
      <Link href="/" className="button">
        <ArrowLeftIcon />
        Back
      </Link>
    </div>
  );
}
