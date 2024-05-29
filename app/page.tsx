import ChapterSummaries from "./chaptersummaries";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={`Loading ...`}>
        <ChapterSummaries />
      </Suspense>
    </main>
  );
}
