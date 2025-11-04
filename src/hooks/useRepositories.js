import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

// Fallback mock data for when server is unavailable
const mockRepositories = {
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears 😭',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 33503,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
    },
    {
      node: {
        id: 'hectahertz.react-native-typography',
        fullName: 'hectahertz/react-native-typography',
        description: 'Pixel–perfect, native–looking typographic styles for React Native ✒️',
        language: 'JavaScript',
        forksCount: 22,
        stargazersCount: 336,
        ratingAverage: 74,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars0.githubusercontent.com/u/4178044?v=4',
      },
    },
  ],
};

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Continue rendering even if there are GraphQL errors
  });

  // Use server data if available, otherwise fallback to mock data
  let repositories;
  if (data && data.repositories) {
    repositories = data.repositories;
  } else if (error) {
    // If there's a GraphQL error (server unavailable), use mock data
    console.log('GraphQL server unavailable, using mock data:', error.message);
    repositories = mockRepositories;
  } else {
    repositories = undefined;
  }

  return {
    repositories,
    loading,
    refetch,
  };
};

export default useRepositories;