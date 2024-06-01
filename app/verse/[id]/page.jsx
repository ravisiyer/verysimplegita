import { getVerse } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { capitalizeFirstLetter } from "@/app/lib/util";
import { FIRST_VERSEID, LAST_VERSEID } from "@/app/constants";
import Navbar from "@/app/ui/navbar";

async function Page({ params }) {
  const verseId = params.id;

  if (isNaN(verseId)) {
    notFound();
  }

  const numericVerseId = Number(verseId);
  if (
    !Number.isInteger(numericVerseId) ||
    numericVerseId < FIRST_VERSEID ||
    numericVerseId > LAST_VERSEID
  ) {
    notFound();
  }

  let data = await getVerse(verseId);
  let gitaVerse = data.gitaVerse;

  const numericChapterNumber = Number(gitaVerse.chapterNumber);
  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <Navbar
          numericVerseId={numericVerseId}
          numericChapterNumber={numericChapterNumber}
        />
        <h3>{`Chapter ${gitaVerse.chapterNumber}, Verse ${gitaVerse.verseNumber}`}</h3>
        <h4>Text</h4>
        <p>{gitaVerse.text}</p>
        <h4>Transliteration</h4>
        <p>{gitaVerse.transliteration}</p>
        <h4>Word Meanings</h4>
        <p>{gitaVerse.wordMeanings}</p>
        <hr />
        <h4>Translations</h4>
        {gitaVerse.gitaTranslationsByVerseId.nodes.map((translation) => (
          <div key={translation.authorId}>
            <b>
              <i>
                In {capitalizeFirstLetter(translation.language)} by{" "}
                {translation.authorName}
              </i>
            </b>
            <p>{translation.description}</p>
          </div>
        ))}
        <hr />
        <h4>Commentaries</h4>
        {gitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
          <div key={commentary.authorId}>
            <b>
              <i>
                In {capitalizeFirstLetter(commentary.language)} by{" "}
                {commentary.authorName}
              </i>
            </b>
            <p>{commentary.description}</p>
          </div>
        ))}
        <hr />
        <p>{`Chapter ${gitaVerse.chapterNumber}, Verse ${gitaVerse.verseNumber}`}</p>
        <Navbar
          numericVerseId={numericVerseId}
          numericChapterNumber={numericChapterNumber}
          idSuffix="2"
        />
      </Suspense>
    </div>
  );
}
export default Page;
