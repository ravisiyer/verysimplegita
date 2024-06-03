"use client";
import "@/app/ui/global.css";
import Link from "next/link";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  FIRST_VERSEID,
  LAST_VERSEID,
} from "@/app/constants";
import SelectChapterVerse from "../ui/selectchapver";
import { usePathname } from "next/navigation";
import {
  getValNumericChapterNumber,
  getValNumericVerseId,
  getCVNumbersFromVerseId,
} from "../lib/util";
import { useEffect, useState } from "react";

function Navbar({ idSuffix = "" }) {
  const [nextHref, setNextHref] = useState("");
  const [prevHref, setPrevHref] = useState("");
  const [upHref, setUpHref] = useState("");

  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  const pathname = usePathname();

  // Code in useEffect to try to avoid unnecessary repeated execution.
  useEffect(() => {
    if (pathname === "/") {
      setChapterNumber("");
      setVerseNumber("");
      setUpHref("");
      setPrevHref("");
      setNextHref("");
    } else {
      const pathSegments = pathname.split("/");
      if (pathSegments.length === 2) {
        const pathChapterNumber = pathSegments[1];
        console.log("In Navbar, pathChapterNumber:", pathChapterNumber);
        const valChapterNumber = getValNumericChapterNumber(pathChapterNumber);
        if (valChapterNumber.valid) {
          const numericChapterNumber = valChapterNumber.numericChapterNumber;
          if (numericChapterNumber > 0) {
            setChapterNumber(pathChapterNumber);
            setVerseNumber("");
            setUpHref("/");
            if (numericChapterNumber > FIRST_CHAPTERNUMBER) {
              setPrevHref(`/${numericChapterNumber - 1}`);
            } else {
              setPrevHref("");
            }
            if (numericChapterNumber < LAST_CHAPTERNUMBER) {
              setNextHref(`/${numericChapterNumber + 1}`);
            } else {
              setNextHref("");
            }
          }
        }
      } else if (pathSegments.length === 3) {
        const pathVerseId = pathSegments[2];
        console.log("In Navbar, pathVerseId:", pathVerseId);
        const valVerseId = getValNumericVerseId(pathVerseId);
        if (valVerseId.valid) {
          const numericVerseId = valVerseId.numericVerseId;
          if (numericVerseId > 0) {
            const chapVerseNumbers = getCVNumbersFromVerseId(pathVerseId);
            setChapterNumber(chapVerseNumbers.chapterNumber);
            setVerseNumber(chapVerseNumbers.verseNumber);
            setUpHref(`/${chapVerseNumbers.chapterNumber}`);
            if (numericVerseId > FIRST_VERSEID) {
              setPrevHref(`/verse/${numericVerseId - 1}`);
            } else {
              setPrevHref("");
            }
            if (numericVerseId < LAST_VERSEID) {
              setNextHref(`/verse/${numericVerseId + 1}`);
            } else {
              setNextHref("");
            }
          }
        }
      }
    }
    console.log("In Navbar useEffect(): Just before exiting");
  }, [pathname]);

  console.log("Just before rendering Navbar div");
  console.log("href values:", prevHref, nextHref, upHref);
  return (
    <div className="Navbar">
      <Link href="/">Home</Link>
      {/* Disabling below Prev and Next links conditionally seems to require the code below. Ref: 
      https://stackoverflow.com/questions/73555618/how-can-i-disable-link-href-in-next-js-on-various-conditions */}
      <Link href={prevHref} className={prevHref === "" ? "disabled" : ""}>
        Prev
      </Link>
      <Link href={nextHref} className={nextHref === "" ? "disabled" : ""}>
        Next
      </Link>
      <Link href={upHref} className={upHref === "" ? "disabled" : ""}>
        Up
      </Link>
      <SelectChapterVerse
        initialChapterNumber={chapterNumber}
        initialVerseNumber={verseNumber}
        idSuffix={idSuffix}
      />
    </div>
  );
}
export default Navbar;
