"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getValNumericChapterNumber,
  getValNumericVerseNumber,
  calcNumericVerseId,
  getMaxVersesInChapter,
  getCVNumbersFromVerseId,
} from "../lib/util";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
} from "../constants";

function SelectChapterVerse({ idSuffix = "" }) {
  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();

  // I am not clear on whether the code in below useEffect should be coded in this useEffect or in the main
  // component itself. The Next.js official tutorial code has a simpler equivalent, coded in the (client) component
  // itself (nav-links.tsx).
  // Another question is whether the dependency array for the useEffect below should be an empty array or
  // have pathname as a dependency.
  // I am getting the impression that in Next.js when the route changes, the component is kind-of recreated (though some
  // caching may be coming into play) and so the empty dependency array useEffect() gets invoked (initialization time).
  // This code works. I think I should postpone deeper analysis of this matter.
  useEffect(() => {
    if (pathname === "/") {
      return;
    }
    const pathSegments = pathname.split("/");
    if (pathSegments.length === 3) {
      const pathVerseId = pathSegments[2];
      console.log("In useEffect(), pathVerseId:", pathVerseId);
      const chapterVerseNumbers = getCVNumbersFromVerseId(pathVerseId);
      setChapterNumber(chapterVerseNumbers.chapterNumber);
      setVerseNumber(chapterVerseNumbers.verseNumber);
    } else if (pathSegments.length === 2) {
      const pathChapterNumber = pathSegments[1];
      console.log("In useEffect(), pathChapterNumber:", pathChapterNumber);
      setChapterNumber(pathChapterNumber);
    }
  }, []);

  function handleGoClick() {
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;

    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (!valChapterNumber.valid) {
      alert(chapterErrorMessage);
      return;
    }
    const numericChapterNumber = valChapterNumber.numericChapterNumber;

    if (verseNumber.trim() === "") {
      replace(`/${chapterNumber}`);
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_ALL_CHAPTERS} and ` +
      `${NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]}`;

    const valVerseNumber = getValNumericVerseNumber(
      verseNumber,
      numericChapterNumber
    );
    if (!valVerseNumber.valid) {
      alert(verseErrorMessage);
      return;
    }
    const numericVerseNumber = valVerseNumber.numericVerseNumber;
    const numericVerseId = calcNumericVerseId(
      numericChapterNumber,
      numericVerseNumber
    );
    replace(`/verse/${numericVerseId}`);
  }

  const idChapterNumber = `chapternumber${idSuffix}`;
  const idVerseNumber = `versenumber${idSuffix}`;

  return (
    <div className="SelectChapterVerse">
      <label htmlFor={idChapterNumber}>Ch.</label>
      <input
        type="number"
        id={idChapterNumber}
        size="2"
        min={FIRST_CHAPTERNUMBER}
        max={LAST_CHAPTERNUMBER}
        value={chapterNumber}
        onChange={(e) => {
          setChapterNumber(e.target.value);
        }}
      />
      <label htmlFor={idVerseNumber}>Ve.</label>
      <input
        type="number"
        id={idVerseNumber}
        size="2"
        min={MIN_VERSE_NUMBER_IN_ALL_CHAPTERS}
        max={
          !chapterNumber || chapterNumber.trim() === ""
            ? MAX_VERSE_NUMBER_IN_ALL_CHAPTERS
            : getMaxVersesInChapter(chapterNumber)
        }
        value={verseNumber}
        onChange={(e) => {
          setVerseNumber(e.target.value);
        }}
      />
      <button onClick={handleGoClick}>Go</button>
    </div>
  );
}
export default SelectChapterVerse;
