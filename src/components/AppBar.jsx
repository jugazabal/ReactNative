import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ children, to, ...props }) => {
  return (
    <Pressable style={styles.tab} {...props}>
      <Link to={to}>
        <Text fontWeight="bold" style={{ color: 'white' }}>
          {children}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;