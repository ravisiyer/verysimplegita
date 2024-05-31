"use client";
import { usePathname, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_CHAPTER,
  MAX_VERSE_NUMBER_IN_CHAPTER,
  NUMBER_OF_VERSES_IN_CHAPTERS,
} from "../constants";

function calcVerseId(numericChapterNumber, numericVerseNumber) {
  let verseId = 0;
  if (numericChapterNumber > 1) {
    const numVersesInChapters = NUMBER_OF_VERSES_IN_CHAPTERS.slice(
      0,
      numericChapterNumber - 1
    );
    for (let i = 0; i < numVersesInChapters.length; i++) {
      verseId += numVersesInChapters[i];
    }
  }
  verseId += numericVerseNumber;
  return verseId;
  // return 701;
}

function SelectChapterVerse() {
  const [chapterNumber, setChapterNumber] = useState("1");
  const [verseNumber, setVerseNumber] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();

  const pathChapterNumber = 1;

  function goToChapterVerse() {
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;
    // const verseErrorMessagePartial =
    //   `For verse (Ve.), please specify a number between ` +
    //   `${MIN_VERSE_NUMBER_IN_CHAPTER} and `;

    if (isNaN(chapterNumber)) {
      alert(chapterErrorMessage);
      return;
    }

    const numericChapterNumber = Number(chapterNumber);
    if (
      !Number.isInteger(numericChapterNumber) ||
      numericChapterNumber < FIRST_CHAPTERNUMBER ||
      numericChapterNumber > LAST_CHAPTERNUMBER
    ) {
      alert(chapterErrorMessage);
      return;
    }

    if (verseNumber.trim() === "") {
      replace(`/${chapterNumber}`);
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_CHAPTER} and ${
        NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
      }`;

    if (isNaN(chapterNumber)) {
      alert(verseErrorMessage);
      return;
    }

    const numericVerseNumber = Number(verseNumber);
    if (
      !Number.isInteger(numericVerseNumber) ||
      numericVerseNumber < MIN_VERSE_NUMBER_IN_CHAPTER ||
      numericVerseNumber >
        NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
    ) {
      alert(verseErrorMessage);
      return;
    }
    const verseId = calcVerseId(numericChapterNumber, numericVerseNumber);
    replace(`/verse/${verseId}`);
  }

  //   function handleChapter(inputChapterNumber) {
  //     setChapterNumber(inputChapterNumber);
  //     //   replace(`/${chapterNumber}`);
  //   }

  //   const handleChapter = useDebouncedCallback((inputChapterNumber) => {
  //     setChapterNumber(inputChapterNumber);
  //     // replace(`/${chapterNumber}`);
  //   }, 300);
  return (
    // <div>
    <>
      <label htmlFor="chapternumber">Ch.</label>
      <input
        type="number"
        name="chapternumber"
        size="2"
        min={FIRST_CHAPTERNUMBER}
        max={LAST_CHAPTERNUMBER}
        value={chapterNumber}
        onChange={(e) => {
          setChapterNumber(e.target.value);
          //   handleChapter(e.target.value);
        }}
        // defaultValue={pathChapterNumber}
      />
      <label htmlFor="versenumber">Ve.</label>
      <input
        type="number"
        name="versenumber"
        size="2"
        min={MIN_VERSE_NUMBER_IN_CHAPTER}
        max={MAX_VERSE_NUMBER_IN_CHAPTER}
        value={verseNumber}
        onChange={(e) => {
          setVerseNumber(e.target.value);
          //   handleChapter(e.target.value);
        }}
        // defaultValue={pathverseNumber}
      />
      <button onClick={goToChapterVerse}>Go</button>
      {/* <button>Go</button> */}
    </>
    // {/* </div> */}
  );
}
export default SelectChapterVerse;
