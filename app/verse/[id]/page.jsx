import { getVerse } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { capitalizeFirstLetter } from "@/app/lib/util";
import { FIRST_VERSEID, LAST_VERSEID } from "@/app/constants";

async function Page({ params }) {
  const verseId = params.id;

  if (isNaN(verseId) || verseId < FIRST_VERSEID || verseId > LAST_VERSEID) {
    notFound();
  }

  let data = await getVerse(verseId);
  let gitaVerse = data.gitaVerse;

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
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
      </Suspense>
    </div>
  );
}
export default Page;
