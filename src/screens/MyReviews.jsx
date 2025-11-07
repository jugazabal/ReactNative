import { useMemo, useCallback } from 'react';
import { Alert, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from '../components/ReviewItem';
import Text from '../components/Text';
import { useCurrentUser } from '../hooks/useCurrentUser';
import useDeleteReview from '../hooks/useDeleteReview';

const REVIEWS_PAGE_SIZE = 10;

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { currentUser, loading, fetchMore, refetch, networkStatus } = useCurrentUser({
    includeReviews: true,
    first: REVIEWS_PAGE_SIZE,
  });
  const [deleteReview] = useDeleteReview();

  const reviews = useMemo(() => {
    return currentUser?.reviews?.edges?.map((edge) => edge.node) ?? [];
  }, [currentUser]);
  const isFetchingMore = networkStatus === 3;

  const renderReviewItem = useCallback(
    ({ item }) => (
      <ReviewItem
        review={item}
        title={item.repository?.fullName}
        showActions
        onViewRepository={handleViewRepository}
        onDeleteReview={handleDeleteReview}
      />
    ),
    [handleViewRepository, handleDeleteReview],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const handleViewRepository = useCallback(
    (repositoryId) => {
      if (!repositoryId) {
        return;
      }

      navigate(`/repositories/${repositoryId}`);
    },
    [navigate],
  );

  const handleDeleteReview = useCallback(
    (reviewId) => {
      if (!reviewId) {
        return;
      }

      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteReview(reviewId);
                await refetch();
              } catch (error) {
                console.log('Failed to delete review:', error.message);
              }
            },
          },
        ],
      );
    },
    [deleteReview, refetch],
  );

  const handleEndReach = useCallback(() => {
    if (typeof fetchMore === 'function') {
      fetchMore();
    }
  }, [fetchMore]);

  if (loading && reviews.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#999999" />
        <Text style={styles.loadingText}>Loading your reviews…</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderReviewItem}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
      initialNumToRender={6}
      windowSize={4}
      maxToRenderPerBatch={6}
      removeClippedSubviews
      ListEmptyComponent={
        !loading ? (
          <View style={styles.emptyState}>
            <Text color="textSecondary">You have not reviewed any repositories yet.</Text>
          </View>
        ) : null
      }
      ListFooterComponent={
        isFetchingMore ? (
          <View style={styles.footerLoading}>
            <ActivityIndicator size="small" color="#999999" />
          </View>
        ) : null
      }
      contentContainerStyle={reviews.length === 0 ? styles.listContentEmpty : null}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
  },
  footerLoading: {
    paddingVertical: 16,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default MyReviews;
