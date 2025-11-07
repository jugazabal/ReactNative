import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

export const useCurrentUser = (options = {}) => {
  const { includeReviews = false, first = 10 } = options;

  const {
    data,
    loading,
    error,
    refetch,
    fetchMore: apolloFetchMore,
    networkStatus,
  } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Continue rendering even with GraphQL errors
    variables: {
      includeReviews,
      first,
    },
  });

  if (error) {
    console.log('GraphQL server unavailable, user not authenticated:', error.message);
    return {
      currentUser: undefined,
      loading: false,
      refetch: async () => undefined,
      networkStatus: undefined,
      fetchMore: () => undefined,
    };
  }

  const currentUser = data ? data.me : undefined;

  const handleFetchMore = () => {
    if (!includeReviews || typeof apolloFetchMore !== 'function') {
      return;
    }

    const pageInfo = currentUser?.reviews?.pageInfo;

    if (!pageInfo?.hasNextPage || loading) {
      return;
    }

    apolloFetchMore({
      variables: {
        includeReviews: true,
        first,
        after: pageInfo.endCursor,
      },
    });
  };

  return {
    currentUser,
    loading,
    refetch,
    networkStatus,
    fetchMore: handleFetchMore,
  };
};