import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../components/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from '../components/Text';

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default RepositoryList;