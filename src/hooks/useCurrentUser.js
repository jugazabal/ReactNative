import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

export const useCurrentUser = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Continue rendering even with GraphQL errors
  });

  // If there's an error (server unavailable), return no user
  if (error) {
    console.log('GraphQL server unavailable, user not authenticated:', error.message);
    return {
      currentUser: undefined,
      loading: false,
    };
  }

  return {
    currentUser: data ? data.me : undefined,
    loading,
  };
};