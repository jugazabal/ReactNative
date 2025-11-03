import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RepositoryItem from '../components/RepositoryItem';
import useRepositories from '../hooks/useRepositories';

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
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Repositories</Text>
      <FlatList
        data={repositoryNodes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e5e9',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e5e9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#24292e',
  },
  separator: {
    height: 10,
  },
});

export default RepositoryList;