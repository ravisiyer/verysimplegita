import Link from "next/link";
import { getAllChapters } from "./lib/data";
import { GRAPHQL_URI } from "@/app/constants";
import SelectChapterVerse from "@/app/ui/selectchapver";

async function ChapterSummaries() {
  let data = await getAllChapters();
  let allGitaChapters = data.allGitaChapters;

  return (
    <div>
      <SelectChapterVerse />
      <h2>Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश</h2>
      <p>{`Data source (GraphQL endpoint): ${GRAPHQL_URI}`}</p>
      {allGitaChapters.map((chapter) => (
        <div key={chapter.id}>
          <Link href={`/${chapter.chapterNumber}`}>
            <h3>{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`}</h3>
          </Link>
          <h4>English Summary</h4>
          <p>{chapter.chapterSummary}</p>
          <h4>हिन्दी सारांश</h4>
          <p>{chapter.chapterSummaryHindi}</p>
          <Link href={`/${chapter.chapterNumber}`}>
            <p>{`${chapter.versesCount} verses`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default ChapterSummaries;
