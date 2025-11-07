import { useState, useMemo, useCallback } from 'react';
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
  ListFooterComponent,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  const repositoryNodes = useMemo(() => {
    return repositories ? repositories.edges.map((edge) => edge.node) : [];
  }, [repositories]);

  const renderItem = useCallback(
    ({ item }) => <RepositoryItem repository={item} onPress={onSelectRepository} />,
    [onSelectRepository],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      initialNumToRender={8}
      windowSize={4}
      maxToRenderPerBatch={8}
      removeClippedSubviews
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
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

  const { repositories, loading, fetchMore, networkStatus } = useRepositories({
    ...repositoryVariables,
    first: 8,
  });
  const navigate = useNavigate();

  const handleRepositoryPress = useCallback(
    (id) => {
      navigate(`/repositories/${id}`);
    },
    [navigate],
  );

  const handleEndReach = useCallback(() => {
    if (typeof fetchMore === 'function') {
      fetchMore();
    }
  }, [fetchMore]);

  const isFetchingMore = networkStatus === 3;

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      onEndReach={handleEndReach}
      onSelectRepository={handleRepositoryPress}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          selectedSort={selectedSort}
          onSortChange={(value) => setSelectedSort(value)}
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
        />
      )}
      ListFooterComponent={
        isFetchingMore ? (
          <View style={styles.footerLoading}>
            <Text>Loading more repositories…</Text>
          </View>
        ) : null
      }
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
  footerLoading: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default RepositoryList;