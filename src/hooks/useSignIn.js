import { useMutation, useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../contexts/AuthStorageContext';
import { AUTHENTICATE } from '../graphql/mutations';

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      // Reset Apollo Client cache to refetch queries with new auth
      apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    // Reset Apollo Client cache to clear user-specific data
    apolloClient.resetStore();
  };

  return signOut;
};