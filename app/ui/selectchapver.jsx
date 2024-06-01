"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FIRST_CHAPTERNUMBER,
  LAST_CHAPTERNUMBER,
  MIN_VERSE_NUMBER_IN_ALL_CHAPTERS,
  MAX_VERSE_NUMBER_IN_ALL_CHAPTERS,
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
}

function SelectChapterVerse({ idSuffix = "" }) {
  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();

  const pathChapterNumber = 1;

  useEffect(() => {
    //Runs only on the first render
    if (pathname === "/") {
      return;
    }
    const pathSegments = pathname.split("/");
    // console.log(pathname);
    // console.log(pathSegments);
    if (pathSegments.length === 3) {
      const pathVerseId = pathSegments[2];
      console.log("In useEffect(), pathVerseId:", pathVerseId);
    } else if (pathSegments.length === 2) {
      const pathChapterNumber = pathSegments[1];
      console.log("In useEffect(), pathChapterNumber:", pathChapterNumber);
      setChapterNumber(pathChapterNumber);
    }
  }, []);

  function getValNumericChapterNumber(chapterNumber) {
    const numericChapterNumber = Number(chapterNumber);
    if (
      !Number.isInteger(numericChapterNumber) ||
      numericChapterNumber < FIRST_CHAPTERNUMBER ||
      numericChapterNumber > LAST_CHAPTERNUMBER
    ) {
      return { valid: false, numericChapterNumber };
    }
    return { valid: true, numericChapterNumber };
  }

  function goToChapterVerse() {
    const chapterErrorMessage =
      `For chapter (Ch.), please specify a number between ` +
      `${FIRST_CHAPTERNUMBER} and ${LAST_CHAPTERNUMBER}`;

    if (isNaN(chapterNumber)) {
      alert(chapterErrorMessage);
      return;
    }
    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (!valChapterNumber.valid) {
      alert(chapterErrorMessage);
      return;
    }
    const numericChapterNumber = valChapterNumber.numericChapterNumber;
    // const numericChapterNumber = Number(chapterNumber);
    // if (
    //   !Number.isInteger(numericChapterNumber) ||
    //   numericChapterNumber < FIRST_CHAPTERNUMBER ||
    //   numericChapterNumber > LAST_CHAPTERNUMBER
    // ) {
    //   alert(chapterErrorMessage);
    //   return;
    // }

    if (verseNumber.trim() === "") {
      replace(`/${chapterNumber}`);
      return;
    }
    const verseErrorMessage =
      `For verse (Ve.) in chapter (Ch.) ${numericChapterNumber}, please specify a number between ` +
      `${MIN_VERSE_NUMBER_IN_ALL_CHAPTERS} and ${
        NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
      }`;

    if (isNaN(chapterNumber)) {
      alert(verseErrorMessage);
      return;
    }

    const numericVerseNumber = Number(verseNumber);
    if (
      !Number.isInteger(numericVerseNumber) ||
      numericVerseNumber < MIN_VERSE_NUMBER_IN_ALL_CHAPTERS ||
      numericVerseNumber >
        NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1]
    ) {
      alert(verseErrorMessage);
      return;
    }
    const verseId = calcVerseId(numericChapterNumber, numericVerseNumber);
    replace(`/verse/${verseId}`);
  }

  function getMaxVersesInChapter(chapterNumber) {
    const valChapterNumber = getValNumericChapterNumber(chapterNumber);
    if (!valChapterNumber.valid) {
      // Rather than return an error, return a safe value
      return MAX_VERSE_NUMBER_IN_ALL_CHAPTERS;
    }
    return NUMBER_OF_VERSES_IN_CHAPTERS[
      valChapterNumber.numericChapterNumber - 1
    ];
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
        max={getMaxVersesInChapter(chapterNumber)}
        value={verseNumber}
        onChange={(e) => {
          setVerseNumber(e.target.value);
        }}
      />
      <button onClick={goToChapterVerse}>Go</button>
    </div>
  );
}
export default SelectChapterVerse;
