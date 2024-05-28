import AllGitaChaptersSummaries from "./allgitachapsumm";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={`Loading ...`}>
        <AllGitaChaptersSummaries />
      </Suspense>
    </main>
  );
}
