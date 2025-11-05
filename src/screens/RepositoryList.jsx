import { useState, useMemo } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from '../components/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from '../components/Text';

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  loading,
  onEndReach,
  onSelectRepository,
  ListHeaderComponent,
}) => {
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
      renderItem={({ item }) => (
        <RepositoryItem repository={item} onPress={onSelectRepository} />
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const SORTING_OPTIONS = [
  {
    label: 'Latest repositories',
    value: 'LATEST',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    value: 'HIGHEST',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    value: 'LOWEST',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

const RepositoryListHeader = ({
  selectedSort,
  onSortChange,
  searchQuery,
  onChangeSearch,
}) => (
  <View style={styles.headerContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchQuery}
      onChangeText={onChangeSearch}
      autoCapitalize="none"
      testID="repositorySearchInput"
    />
    <Picker
      selectedValue={selectedSort}
      onValueChange={onSortChange}
      testID="repositorySortPicker"
    >
      {SORTING_OPTIONS.map((option) => (
        <Picker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </Picker>
  </View>
);

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState(SORTING_OPTIONS[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const sortingVariables = useMemo(() => {
    const selectedOption =
      SORTING_OPTIONS.find((option) => option.value === selectedSort) || SORTING_OPTIONS[0];

    return {
      orderBy: selectedOption.orderBy,
      orderDirection: selectedOption.orderDirection,
    };
  }, [selectedSort]);

  const repositoryVariables = useMemo(() => {
    const trimmedSearch = debouncedSearchQuery.trim();

    return {
      ...sortingVariables,
      searchKeyword: trimmedSearch.length > 0 ? trimmedSearch : undefined,
    };
  }, [sortingVariables, debouncedSearchQuery]);

  const { repositories, loading } = useRepositories(repositoryVariables);
  const navigate = useNavigate();

  const handleRepositoryPress = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      onSelectRepository={handleRepositoryPress}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          selectedSort={selectedSort}
          onSortChange={(value) => setSelectedSort(value)}
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default RepositoryList;