import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useSignOut } from '../hooks/useSignIn';
import React from 'react';

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
  let currentUser = undefined;
  let signOut = () => {};

  try {
    const userResult = useCurrentUser();
    currentUser = userResult.currentUser;
    signOut = useSignOut();
  } catch (error) {
    console.log('Error loading user authentication:', error.message);
  }

  const handleSignOut = () => {
    try {
      signOut();
    } catch (error) {
      console.log('Error signing out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {currentUser ? (
          <Pressable style={styles.tab} onPress={handleSignOut}>
            <Text fontWeight="bold" style={{ color: 'white' }}>
              Sign out
            </Text>
          </Pressable>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;