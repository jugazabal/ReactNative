import { View, StyleSheet } from 'react-native';
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

const ReviewItem = ({ review }) => {
  const formattedDate = formatDate(review.createdAt);

  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText} fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" style={styles.username}>
          {review.user?.username ?? 'Anonymous'}
        </Text>
        {formattedDate ? (
          <Text color="textSecondary" style={styles.dateText}>
            {formattedDate}
          </Text>
        ) : null}
        <Text style={styles.reviewText}>{review.text}</Text>
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
});

export default ReviewItem;
