import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// For now, we'll use a placeholder URL since we don't have the actual backend endpoint
// In a real application, this would be the URL to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
};

export default createApolloClient;