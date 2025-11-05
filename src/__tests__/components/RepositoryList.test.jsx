import { fireEvent, render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../screens/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    const repositories = {
      totalCount: 2,
      pageInfo: {
        hasNextPage: true,
        endCursor: 'cursor2',
        startCursor: 'cursor1',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'cursor1',
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
          cursor: 'cursor2',
        },
      ],
    };

    it('renders repository information correctly', () => {
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} loading={false} />,
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstRepository, secondRepository] = repositoryItems;

      const firstWithin = within(firstRepository);
      const secondWithin = within(secondRepository);

      expect(firstWithin.getByText('jaredpalmer/formik')).toBeTruthy();
      expect(firstWithin.getByText('Build forms in React, without the tears')).toBeTruthy();
      expect(firstWithin.getByText('TypeScript')).toBeTruthy();
      expect(firstWithin.getByText('21.9k')).toBeTruthy();
      expect(firstWithin.getByText('1.6k')).toBeTruthy();
      expect(firstWithin.getByText('3')).toBeTruthy();
      expect(firstWithin.getByText('88')).toBeTruthy();

      expect(secondWithin.getByText('async-library/react-async')).toBeTruthy();
      expect(secondWithin.getByText('Flexible promise-based React data loader')).toBeTruthy();
      expect(secondWithin.getByText('JavaScript')).toBeTruthy();
      expect(secondWithin.getByText('1.8k')).toBeTruthy();
      expect(secondWithin.getByText('69')).toBeTruthy();
      expect(secondWithin.getByText('3')).toBeTruthy();
      expect(secondWithin.getByText('72')).toBeTruthy();
    });

    it('calls onSelectRepository when repository is pressed', () => {
      const onSelectRepository = jest.fn();
      const { getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories}
          loading={false}
          onSelectRepository={onSelectRepository}
        />,
      );

      fireEvent.press(getAllByTestId('repositoryItem')[0]);

      expect(onSelectRepository).toHaveBeenCalledWith('jaredpalmer.formik');
    });
  });
});
