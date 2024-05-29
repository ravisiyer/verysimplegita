import { gql } from "@apollo/client";
import createApolloClient from "@/apolloClient";

// Ref: https://www.apollographql.com/blog/next-js-getting-started
export async function getAllChapters() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        allGitaChapters {
          nodes {
            id
            chapterNumber
            chapterSummary
            chapterSummaryHindi
            name
            nameTranslated
            versesCount
          }
        }
      }
    `,
  });

  return {
    allGitaChapters: data.allGitaChapters.nodes,
  };
}

export async function getChapter(chapterNumber) {
  const client = createApolloClient();
  const { data } = await client.query({
    //Get all verses of chapter along with one (first) English translation (description) for each verse
    // languageId: 1 is English
    query: gql`
      query {
        allGitaChapters(condition: { chapterNumber: ${chapterNumber} }) {
          nodes {
            versesCount
            name
            nameTranslated
            chapterSummary
            chapterSummaryHindi
            gitaVersesByChapterId {
              nodes {
                verseNumber
                transliteration
                id
                text
                wordMeanings
                gitaTranslationsByVerseId(condition: { languageId: 1 }, first: 1) {
                  nodes {
                    description
                    verseId
                    authorName
                  }
                }
              }
            }
          }
        }
      }
      `,
  });

  return {
    gitaChapter: data.allGitaChapters.nodes[0],
  };
}

export async function getVerse(verseId) {
  const client = createApolloClient();
  const { data } = await client.query({
    //Get verse data for specified verseId
    query: gql`
      query {
        allGitaVerses(condition: { id: ${verseId} }) {
          nodes {
            chapterNumber
            verseNumber
            text
            transliteration
            wordMeanings
            gitaTranslationsByVerseId {
              nodes {
                authorId
                authorName
                description
                language
              }
            }
            gitaCommentariesByVerseId {
              nodes {
                authorId
                authorName
                description
                language
              }
            }
          }
        }
      }
      `,
  });

  return {
    gitaVerse: data.allGitaVerses.nodes[0],
  };
}
