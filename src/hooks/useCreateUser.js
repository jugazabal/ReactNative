import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

export const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return data?.createUser;
  };

  return [createUser, result];
};
