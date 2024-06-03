"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getValNumericChapterNumber,
  getValNumericVerseNumber,
  calcNumericVerseId,
  getMaxVersesInChapter,
} from "../lib/util";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
  NUMBER_OF_VERSES_IN_CHAPTERS,
} from "../constants";

function SelectChapterVerse({
  initialChapterNumber = "",
  initialVerseNumber = "",
  idSuffix = "",
}) {
  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  console.log("SCV: initialChapterNumber: ", initialChapterNumber);
  console.log("SCV: initialVerseNumber: ", initialVerseNumber);
  console.log("SCV: chapterNumber: ", chapterNumber);
  console.log("SCV: verseNumber: ", verseNumber);

  useEffect(() => {
    setChapterNumber(initialChapterNumber);
    setVerseNumber(initialVerseNumber);
    console.log(
      "SCV UseEffect: Set chapter and verse number state variables to passed & changed props"
    );
  }, [initialChapterNumber, initialVerseNumber]);

  const { replace } = useRouter();

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
    <form
      className="SelectChapterVerse"
      onSubmit={(e) => {
        console.log("SCV onSubmit handler invoked.");
        e.preventDefault();
        handleGoClick(e);
      }}
    >
      <label htmlFor={idChapterNumber}>Ch.</label>
      <input
        type="number"
        id={idChapterNumber}
        size="2"
        min={FIRST_CHAPTERNUMBER}
        max={LAST_CHAPTERNUMBER}
        required
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
      <input type="submit" value="Go" />
    </form>
  );
}
export default SelectChapterVerse;
