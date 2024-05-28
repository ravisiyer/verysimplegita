import Link from "next/link";
import { getAllChapters } from "./lib/data";

async function AllGitaChaptersSummaries() {
  let data = await getAllChapters();
  let allGitaChapters = data.allGitaChapters;

  return (
    <div>
      <h2>Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश</h2>
      <p>
        Starter/test app. version without styling. Data source:
        https://gql.bhagavadgita.io/graphql. Data fetched using Apollo Client.
      </p>
      {allGitaChapters.map(
        (chapter: {
          id: number;
          chapterNumber: number;
          name: string;
          nameTranslated: string;
          chapterSummary: string;
          chapterSummaryHindi: string;
          versesCount: number;
        }) => (
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
        )
      )}
    </div>
  );
}
export default AllGitaChaptersSummaries;
