import { useState, useEffect } from 'react';

// Mock data for now since we don't have a real backend
const mockRepositories = {
  repositories: {
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
  },
};

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = () => {
    setLoading(true);
    
    // Simulate loading and then set data
    setRepositories(mockRepositories.repositories);
    setLoading(false);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;