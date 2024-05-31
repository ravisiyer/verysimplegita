import "@/app/ui/global.css";
import Link from "next/link";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  FIRST_VERSEID,
  LAST_VERSEID,
} from "@/app/constants";
import SelectChapterVerse from "../ui/selectchapver";

function Navbar({ numericChapterNumber = 0, numericVerseId = 0 }) {
  let nextHref = "";
  let prevHref = "";
  let upHref = "";

  if (numericVerseId > 0) {
    upHref = `/${numericChapterNumber}`;
    if (numericVerseId > FIRST_VERSEID) {
      prevHref = `/verse/${numericVerseId - 1}`;
    }
    if (numericVerseId < LAST_VERSEID) {
      nextHref = `/verse/${numericVerseId + 1}`;
    }
  } else if (numericChapterNumber > 0) {
    upHref = "/";
    if (numericChapterNumber > FIRST_CHAPTERNUMBER) {
      prevHref = `/${numericChapterNumber - 1}`;
    }
    if (numericChapterNumber < LAST_CHAPTERNUMBER) {
      nextHref = `/${numericChapterNumber + 1}`;
    }
  }

  return (
    <div className="Navbar">
      <Link href="/">Home</Link>
      {/* Disabling below Prev and Next links conditionally seems to require the complicated code below 
      Ref: 
      https://stackoverflow.com/questions/73555618/how-can-i-disable-link-href-in-next-js-on-various-conditions */}
      <Link href={prevHref} className={prevHref === "" ? "disabled" : ""}>
        Prev
      </Link>
      <Link href={nextHref} className={nextHref === "" ? "disabled" : ""}>
        Next
      </Link>
      <Link href={upHref}>Up</Link>
      <SelectChapterVerse />
    </div>
  );
}
export default Navbar;
