import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ repository, onPress, showOpenInGitHub = false, onOpenInGitHub }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(repository.id);
    }
  };

  const handleOpenInGitHub = () => {
    if (onOpenInGitHub) {
      onOpenInGitHub(repository.url);
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      disabled={!onPress}
      testID="repositoryItem"
    >
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
          <Text color="textSecondary" style={{ marginVertical: 5 }}>{repository.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={{ color: 'white' }} fontWeight="bold">{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(repository.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(repository.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {showOpenInGitHub && (
        <Pressable style={styles.githubButton} onPress={handleOpenInGitHub}>
          <Text style={styles.githubButtonText} fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  githubButton: {
    marginTop: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  githubButtonText: {
    color: 'white',
  },
});

export default RepositoryItem;