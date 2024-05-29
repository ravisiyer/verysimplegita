import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URI = "https://gql.bhagavadgita.io/graphql";

const createApolloClient = () => {
  return new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
