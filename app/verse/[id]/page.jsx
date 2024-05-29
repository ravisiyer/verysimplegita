import { getVerse } from "@/app/lib/data";
import { notFound } from "next/navigation";

async function Page({ params }) {
  const verseId = params.id;

  // Hard coded now; Replace later from data
  if (isNaN(verseId) || verseId < 1 || verseId > 701) {
    notFound();
  }

  let data = await getVerse(verseId);
  let gitaVerse = data.gitaVerse;

  return (
    <div key={verseId}>
      {/* {`Verse id: ${verseId}`} */}
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
            <i> {`In ${translation.language} by ${translation.authorName}`}</i>
          </b>
          <p>{translation.description}</p>
        </div>
      ))}
      <hr />
      <h4>Commentaries</h4>
      {/* <hr /> */}
      {gitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
        <div key={commentary.authorId}>
          <b>
            <i> {`In ${commentary.language} by ${commentary.authorName}`}</i>
          </b>
          <p>{commentary.description}</p>
        </div>
      ))}
      {/* <hr /> */}
    </div>
  );
}
export default Page;
