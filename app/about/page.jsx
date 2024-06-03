import { GRAPHQL_URI } from "@/app/constants";

function Page() {
  return (
    <div>
      <p>
        This is a very simple but functional, open-source freeware, Bhagavad
        Gita web app I wrote recently. It uses Next.js and Apollo Client to
        retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint,
        and displays it on browser. It is shared under free-software MIT
        license.
      </p>
      <p>{`Data source (GraphQL endpoint): ${GRAPHQL_URI}`}</p>
      <p>
        I have deliberately kept this version very simple. I saw some
        open-source Gita apps using Next.js but their code was quite involved. I
        wanted to see whether one can write very simple Hindu scripture viewer
        web apps using current Next.js framework without too much code and
        coding complexity, provided scripture content was available through an
        API. Note that using current Next.js framework may provide performance
        benefits for the web app.
      </p>
      <a href="https://raviswdev.blogspot.com/2024/05/notes-on-my-very-simple-bhagavad-gita.html">
        More about this app can be read in this associated blog post.
      </a>
      <p>Ravi S. Iyer</p>
    </div>
  );
}
export default Page;
