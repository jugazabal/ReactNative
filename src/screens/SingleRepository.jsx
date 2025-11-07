import { useMemo, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from '../components/RepositoryItem';
import ReviewItem from '../components/ReviewItem';
import Text from '../components/Text';
import theme from '../theme';
import { GET_REPOSITORY } from '../graphql/queries';

const ItemSeparator = () => <View style={styles.separator} />;

const REVIEWS_PAGE_SIZE = 10;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore, networkStatus } = useQuery(GET_REPOSITORY, {
    variables: { id, first: REVIEWS_PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data?.repository;
  const reviewNodes = useMemo(() => {
    return repository?.reviews?.edges?.map((edge) => edge.node) ?? [];
  }, [repository]);
  const isFetchingMore = networkStatus === 3;

  const handleOpenInGitHub = useCallback(() => {
    if (repository?.url) {
      Linking.openURL(repository.url);
    }
  }, [repository?.url]);

  const handleFetchMore = useCallback(() => {
    const pageInfo = repository?.reviews?.pageInfo;

    if (!pageInfo?.hasNextPage || typeof fetchMore !== 'function' || loading) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: REVIEWS_PAGE_SIZE,
        after: pageInfo.endCursor,
      },
    });
  }, [repository, fetchMore, loading, id]);

  if (loading && !repository) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="gray" />
        <Text style={styles.loadingText}>Loading repository…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load repository details.</Text>
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={styles.centered}>
        <Text>Repository not found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem
            repository={repository}
            showOpenInGitHub
            onOpenInGitHub={handleOpenInGitHub}
          />
          <ItemSeparator />
        </View>
      )}
      ListEmptyComponent={
        !loading && reviewNodes.length === 0
          ? () => (
              <View style={styles.emptyState}>
                <Text color="textSecondary">No reviews yet.</Text>
              </View>
            )
          : null
      }
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingMore ? (
          <View style={styles.footerLoading}>
            <ActivityIndicator size="small" color="#999999" />
          </View>
        ) : null
      }
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
  },
  errorText: {
    color: 'red',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 16,
    alignItems: 'center',
  },
  footerLoading: {
    paddingVertical: 16,
  },
});

export default SingleRepository;
