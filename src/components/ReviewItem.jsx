import { View, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const formatDate = (value) => {
  try {
    return format(new Date(value), 'dd.MM.yyyy');
  } catch {
    return '';
  }
};

const ReviewItem = ({
  review,
  title,
  showActions = false,
  onViewRepository,
  onDeleteReview,
}) => {
  const formattedDate = formatDate(review.createdAt);
  const heading = title ?? review.user?.username ?? 'Anonymous';

  const handleViewRepository = () => {
    if (typeof onViewRepository === 'function') {
      onViewRepository(review.repositoryId);
    }
  };

  const handleDeleteReview = () => {
    if (typeof onDeleteReview === 'function') {
      onDeleteReview(review.id);
    }
  };

  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText} fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" style={styles.username}>
          {heading}
        </Text>
        {formattedDate ? (
          <Text color="textSecondary" style={styles.dateText}>
            {formattedDate}
          </Text>
        ) : null}
        <Text style={styles.reviewText}>{review.text}</Text>
        {showActions ? (
          <View style={styles.actionsContainer}>
            <Pressable style={styles.actionButton} onPress={handleViewRepository}>
              <Text style={styles.actionButtonText} fontWeight="bold">
                View repository
              </Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDeleteReview}
            >
              <Text style={styles.deleteButtonText} fontWeight="bold">
                Delete review
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    marginBottom: 4,
  },
  dateText: {
    marginBottom: 8,
  },
  reviewText: {
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  actionButtonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    marginRight: 0,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default ReviewItem;
