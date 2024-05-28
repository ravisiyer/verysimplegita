import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getChapter } from "../lib/data";
import Link from "next/link";

async function Page({ params }) {
  const chapterNumber = params.chapternumber;

  // Hard coded now; Replace later from data
  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 18) {
    notFound();
  }

  let data = await getChapter(chapterNumber);
  let gitaChapter = data.gitaChapter;

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3>{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</h3>
        <h4>English Summary</h4>
        <p>{gitaChapter.chapterSummary}</p>
        <h4>हिन्दी सारांश</h4>
        <p>{gitaChapter.chapterSummaryHindi}</p>
        <h4>{`${gitaChapter.versesCount} verses`}</h4>
        {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
          <div key={verse.id}>
            {/* <Link href={`/${verse.verseNumber}`}> */}
            <h3>{`Verse ${verse.verseNumber}`}</h3>
            {/* </Link> */}
            <h4>Text</h4>
            <p>{verse.text}</p>
            <h4>Transliteration</h4>
            <p>{verse.transliteration}</p>
            <h4>Word Meanings</h4>
            <p>{verse.wordMeanings}</p>
            <hr />
          </div>
        ))}
      </Suspense>
    </div>
  );
}
export default Page;
