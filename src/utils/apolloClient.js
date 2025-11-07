import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_URI } from '@env';

const createApolloClient = (authStorage) => {
  // Fallback URI in case environment variable is not loaded
  const uri = APOLLO_URI || 'http://172.31.220.197:4000/graphql';
  
  const httpLink = createHttpLink({
    uri: uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repositories: relayStylePagination([
              'orderBy',
              'orderDirection',
              'searchKeyword',
            ]),
          },
        },
        Repository: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
        User: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
      },
    }),
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