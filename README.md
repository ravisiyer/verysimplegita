This is a very simple but functional, open-source freeware, Bhagavad Gita web app. It uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint: https://gql.bhagavadgita.io/graphql (Explorer: https://gql.bhagavadgita.io/graphiql), and displays it on browser. It is shared under free-software MIT license.

I have deliberately kept this version very simple. I saw some open-source Gita apps using Next.js but their code was quite involved. I wanted to see whether one can write very simple Hindu scripture viewer web apps using current Next.js framework without too much code and coding complexity, provided scripture content was available through an API. Note that using current Next.js framework may provide performance benefits for the web app.

I think the advantages of keeping this very simple are:

1. As plain HTML is used without any images, the content is automatically shown suitably for devices of various screen/window widths like PC or mobile without writing any media query and related CSS code. [I must say here that I have seen quite a few Hindu scripture websites/web apps which display well on PC screens (large window width) but on mobile screens, they force the user to do a lot of horizontal scrolling to view the content, which makes it very cumbersome to view these websites on mobile. This open-source freeware app. may be of some help to such websites/web apps authors/owners & developers to migrate them to Next.js and make their sites/apps easily usable on mobile.]
2. As default margins are used, the text content fills up the available screen/window real estate of the device and shows maximum text content to the user.
3. A lot of content is shown on one page (e.g. all chapter summaries on one page and text & translation of all verses of a chapter on one page) thereby making it convenient for a viewer who wants to easily browse through such content without having to frequently press next/prev navigation buttons and have the page reloaded.
4. The source code is very simple enabling developers to understand it quickly and use it as a starter or
   template to build more complex Gita web apps and other chapter-verse kind of web apps.
5. Software development students and learners would find it easy to study and use the code.

Of course, there are many disadvantages with the biggest perhaps being that the user interface functionality is very minimal. It also does not have attractive frills like images and other graphics. I hope to work on another version of the app. which provides more user interface functionality (like choosing which translations & commentaries should be shown).
