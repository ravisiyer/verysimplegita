import "@/app/ui/global.css";
import Link from "next/link";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  FIRST_VERSEID,
  LAST_VERSEID,
} from "@/app/constants";

function Navbar({ numericChapterNumber = 0, numericVerseId = 0 }) {
  let nextHref = "";
  let prevHref = "";
  if (numericChapterNumber > 0) {
    if (numericChapterNumber > FIRST_CHAPTERNUMBER) {
      prevHref = `/${numericChapterNumber - 1}`;
    }
    if (numericChapterNumber < LAST_CHAPTERNUMBER) {
      nextHref = `/${numericChapterNumber + 1}`;
    }
  }

  if (numericVerseId > 0) {
    if (numericVerseId > FIRST_VERSEID) {
      prevHref = `/verse/${numericVerseId - 1}`;
    }
    if (numericVerseId < LAST_VERSEID) {
      nextHref = `/verse/${numericVerseId + 1}`;
    }
  }

  return (
    <div className="Navbar">
      <Link href="/">Home</Link>
      {/* Disabling below Prev and Next links conditionally seems to require the complicated code below 
      Ref: 
      https://stackoverflow.com/questions/73555618/how-can-i-disable-link-href-in-next-js-on-various-conditions */}
      <Link
        href={prevHref}
        style={{
          pointerEvents: prevHref === "" ? "none" : "auto",
        }}
      >
        Prev
      </Link>
      <Link
        href={nextHref}
        style={{
          pointerEvents: nextHref === "" ? "none" : "auto",
        }}
      >
        Next
      </Link>
    </div>
  );
}
export default Navbar;
