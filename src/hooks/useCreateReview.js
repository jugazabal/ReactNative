import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    const { data } = await mutate({
      variables: { review },
    });

    return data?.createReview;
  };

  return [createReview, result];
};
