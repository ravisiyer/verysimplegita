import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getChapter } from "../lib/data";

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
        <h3>{`Chapter: ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</h3>
        <h4>English Summary</h4>
        <p>{gitaChapter.chapterSummary}</p>
        <h4>हिन्दी सारांश</h4>
        <p>{gitaChapter.chapterSummaryHindi}</p>
        <h4>{`${gitaChapter.versesCount} verses`}</h4>
      </Suspense>
    </div>
  );
}
export default Page;
