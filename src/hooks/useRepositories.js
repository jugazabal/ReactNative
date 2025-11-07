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
        createdAt: '2020-07-04T10:00:00.000Z',
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
        createdAt: '2021-01-15T12:30:00.000Z',
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
        createdAt: '2019-10-20T08:45:00.000Z',
      },
    },
  ],
};

const filterAndSortMockRepositories = (
  repositories,
  { orderBy, orderDirection, searchKeyword },
) => {
  if (!repositories) {
    return repositories;
  }

  const normalizedSearch = searchKeyword ? searchKeyword.toLowerCase() : undefined;

  const filteredEdges = repositories.edges.filter(({ node }) => {
    if (!normalizedSearch) {
      return true;
    }

    const { fullName = '', description = '' } = node;
    return (
      fullName.toLowerCase().includes(normalizedSearch) ||
      description.toLowerCase().includes(normalizedSearch)
    );
  });

  const directionMultiplier = orderDirection === 'ASC' ? 1 : -1;

  const sortedEdges = [...filteredEdges].sort((a, b) => {
    const repoA = a.node;
    const repoB = b.node;

    let valueA = 0;
    let valueB = 0;

    if (orderBy === 'RATING_AVERAGE') {
      valueA = repoA.ratingAverage ?? 0;
      valueB = repoB.ratingAverage ?? 0;
    } else {
      valueA = repoA.createdAt ? new Date(repoA.createdAt).valueOf() : 0;
      valueB = repoB.createdAt ? new Date(repoB.createdAt).valueOf() : 0;
    }

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return directionMultiplier;
    }

    return -directionMultiplier;
  });

  return {
    ...repositories,
    edges: sortedEdges,
  };
};

const useRepositories = (options = {}) => {
  const { orderBy, orderDirection, searchKeyword, first = 10 } = options;

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword,
    first,
  };

  const {
    data,
    loading,
    error,
    refetch,
    fetchMore: apolloFetchMore,
    networkStatus,
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Continue rendering even if there are GraphQL errors
    variables,
  });

  // Use server data if available, otherwise fallback to mock data
  let repositories;
  if (data && data.repositories) {
    repositories = data.repositories;
  } else if (error) {
    // If there's a GraphQL error (server unavailable), use mock data
    console.log('GraphQL server unavailable, using mock data:', error.message);
    repositories = filterAndSortMockRepositories(mockRepositories, {
      orderBy,
      orderDirection,
      searchKeyword,
    });
  } else {
    repositories = undefined;
  }

  return {
    repositories,
    loading,
    networkStatus,
    fetchMore: () => {
      if (typeof apolloFetchMore !== 'function') {
        return;
      }

      if (!data?.repositories?.pageInfo?.hasNextPage || loading) {
        return;
      }

      apolloFetchMore({
        variables: {
          ...variables,
          after: data.repositories.pageInfo.endCursor,
        },
      });
    },
    refetch: (args) => refetch({ ...variables, ...args }),
  };
};

export default useRepositories;