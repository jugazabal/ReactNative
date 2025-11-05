import { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import { AuthStorageProvider } from './src/contexts/AuthStorageContext';

export default function App() {
  const authStorage = useMemo(() => new AuthStorage(), []);
  const apolloClient = useMemo(() => createApolloClient(authStorage), [authStorage]);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageProvider authStorage={authStorage}>
          <Main />
          <StatusBar style="auto" />
        </AuthStorageProvider>
      </ApolloProvider>
    </NativeRouter>
  );
}
