# React Native Implementation Requirements

## Overview
This document contains the implementation requirements for the Full Stack Open React Native course (Part 10). We will be developing a React Native application for rating GitHub repositories from the bottom up.

## Application Features
The final application will include:
- Rating and reviewing GitHub repositories
- Sorting and filtering reviewed repositories
- User registration and authentication
- User login functionality
- Creating reviews for repositories
- Beautiful user interfaces using React Native components
- Server communication capabilities

## Prerequisites
Before starting this implementation, ensure you have knowledge of:
- JavaScript fundamentals
- React (Parts 1, 2, 5, 7)
- GraphQL (Part 8)
- Basic understanding of network requests

## Development Environment Setup

### 1. Initialize the Application
```bash
npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50
cd rate-repository-app
```

### 2. Install Required Dependencies
```bash
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/metro-runtime@~3.1.1
```

### 3. Project Structure
The initialized project should contain:
- `package.json` - Project dependencies and scripts
- `node_modules/` - Node.js dependencies
- `app.json` - Expo-related configuration
- `App.js` - Root component (do not rename or move)

### 4. Available Scripts
- `npm start` - Start Metro bundler and Expo CLI
- `npm run android` - Start for Android emulator
- `npm run ios` - Start for iOS simulator  
- `npm run web` - Start web version

## Development Environment Options

### Option 1: Emulators
- **Android**: Set up Android emulator with Android Studio (any OS)
- **iOS**: Set up iOS simulator with Xcode (macOS only)

### Option 2: Expo Mobile App
- Install Expo Go app on your mobile device
- Ensure device is on same Wi-Fi network as development machine
- Scan QR code to open application

### Option 3: Web Browser
- Press "w" in terminal when Expo CLI is running
- Good for initial development but limited native simulation

## Code Quality Setup

### ESLint Configuration

#### 1. Install ESLint Dependencies
```bash
npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native
```

#### 2. Create `.eslintrc.json`
```json
{
  "plugins": ["react", "react-native"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@babel/eslint-parser",
  "env": {
    "react-native/react-native": true
  },
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

#### 3. Add Lint Script to package.json
```json
{
  "scripts": {
    "lint": "eslint ./src/**/*.{js,jsx} App.js --no-error-on-unmatched-pattern"
  }
}
```

#### 4. Editor Integration
- Install ESLint extension in VS Code
- Enable real-time linting feedback

## Development Guidelines

### File Organization
- Place future application code in `src/` directory
- Keep `App.js` as the main entry point
- Follow React Native naming conventions

### Development Workflow
1. Start development tools: `npm start`
2. Choose development environment (emulator/device/web)
3. Make code changes with hot reload enabled
4. Test on multiple platforms when possible
5. Run linting: `npm run lint`

### Debugging Tools
- **Console Logs**: Appear in Expo development tools command line
- **React DevTools**: Install with `npx react-devtools`
- **In-app Developer Menu**: Access React Native debugging options
- **Network Inspector**: Monitor API calls and responses

## Implementation Phases

### Phase 1: Setup and Configuration
- [x] Initialize Expo application
- [x] Set up development environment
- [x] Configure ESLint
- [x] Set up project structure

### Phase 2: Core Components
- [x] Create basic navigation structure
- [x] Implement repository list view
- [x] Add repository item components
- [x] Style with React Native components

### Phase 3: Server Communication Setup
- [ ] Set up rate-repository-api server
- [ ] Configure HTTP requests with Fetch API
- [ ] Set up GraphQL and Apollo Client
- [ ] Configure environment variables
- [ ] Implement data storage (AsyncStorage)

### Phase 4: Data Management
- [ ] Replace mock data with server data
- [ ] Implement repository data fetching with GraphQL
- [ ] Add state management (Context/Redux)
- [ ] Handle loading and error states

### Phase 5: User Authentication
- [ ] Implement sign-in mutation
- [ ] Store access tokens securely
- [ ] Enhance Apollo Client with authentication
- [ ] Implement sign-out functionality
- [ ] Add user context management

### Phase 6: Advanced Features
- [ ] Add sorting and filtering
- [ ] Implement pagination
- [ ] Add form validation
- [ ] Optimize performance

### Phase 7: Testing & Quality Assurance
- [x] Install and configure Jest with `jest-expo`
- [x] Extend ESLint with `eslint-plugin-jest`
- [x] Create global test setup in `setupTests.js`
- [x] Establish test directory structure (eg. `src/__tests__` or colocated `.test.jsx` files)
- [x] Add baseline smoke test to verify configuration
- [x] Implement component tests for `RepositoryListContainer` (exercise 10.17)
- [x] Implement form submission test for `SignInContainer` (exercise 10.18)
- [ ] Document testing conventions in project README or internal docs

### Phase 8: Feature Extensions Roadmap
- [x] **Single Repository View (10.19)**: Add route with detail view, reuse `RepositoryItem`, include GitHub link via Expo `Linking.openURL`.
- [x] **Repository Review List (10.20)**: Fetch reviews, render with `FlatList` header + `ReviewItem`, format dates (eg. `date-fns`).
- [x] **Create Review Form (10.21)**: Build Formik form with Yup validation, call `createReview`, navigate to created repository, expose tab for signed-in users.
- [x] **Sign Up Flow (10.22)**: Implement registration form, call `createUser`, auto-sign-in using `useSignIn`, add app bar tab for guests.
- [x] **Repository Sorting (10.23)**: Provide picker/menu control, wire to `useRepositories` variables (`orderBy`, `orderDirection`).
- [x] **Repository Filtering (10.24)**: Add search input with debounced keyword (`use-debounce`), ensure header retains focus when used inside `FlatList`.
- **My Reviews View (10.25)**: Extend `GET_CURRENT_USER` with `includeReviews` flag, render user reviews list with navigation options.
- **Review Actions (10.26)**: Add buttons for opening repository and deleting review (with `Alert` confirmation and `deleteReview` mutation + refetch).
- **Infinite Scrolling (10.27)**: Configure Apollo cache `typePolicies` with `relayStylePagination`, implement `fetchMore` flows for repositories and review lists, hook into `onEndReached`.

### Supporting Implementation Steps
- Update Apollo queries (`GET_REPOSITORY`, `GET_CURRENT_USER`) to accept new variables and include pagination fields (`pageInfo`, `edges.cursor`).
- Introduce reusable UI primitives for buttons, lists, and typographic elements to keep new views consistent.
- Ensure navigation updates (new routes, tabs) respect authentication context state and reset flows.
- Add environment variable entries (eg. `APOLLO_URI`) required by new features to `.env.example` if shared.
- Plan backend data seeding or mock scenarios to support automated tests covering reviews, users, and repositories.

### Dependency Checklist for New Work
```bash
# Testing stack
npm install --save-dev jest jest-expo eslint-plugin-jest
npm install --save-dev --legacy-peer-deps react-test-renderer@18.2.0 @testing-library/react-native @testing-library/jest-native

# Feature work utilities
npm install date-fns use-debounce
npm install expo-linking --legacy-peer-deps
```

## Submission Requirements

### Repository Setup
1. Create new GitHub repository
2. Initialize Git in project directory: `git init`
3. Add remote repository: `git remote add origin <repository-url>`
4. Make regular commits and pushes
5. Add GitHub user `mluukkai` as collaborator (if private repo)

### Exercise Submission
- Submit exercises via [Full Stack Open submission system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020)
- Exercises are submitted section by section (parts 1-4 = sections a-d)
- Complete at least 25 exercises to earn 2 credits

### Development Best Practices
- Develop incrementally alongside course material
- Test on multiple platforms regularly
- Use meaningful commit messages
- Follow React Native and React best practices
- Implement proper error handling
- Write clean, maintainable code

## Technical Specifications

### Platform Support
- **Primary**: iOS and Android native apps
- **Secondary**: Web browser (for development)

### Key Technologies
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **React**: Component-based UI library
- **JavaScript**: Primary programming language
- **GraphQL**: API communication
- **Metro**: JavaScript bundler

### Performance Considerations
- Optimize bundle size
- Implement lazy loading where appropriate
- Use native components over web-based alternatives
- Profile and monitor performance metrics

## Resources

### Documentation
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Documentation](https://react.dev/)

### Development Tools
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [React DevTools](https://reactnative.dev/docs/react-devtools)
- [Flipper](https://fbflipper.com/) (Advanced debugging)

### Community
- [React Native Community](https://github.com/react-native-community)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

## Server Communication Implementation

### Phase 3 Detailed Steps: Server Communication Setup

#### Step 1: Set Up Rate Repository API Server

1. **Clone and Setup Server**
```bash
git clone https://github.com/fullstack-hy2020/rate-repository-api.git
cd rate-repository-api
npm install
npm run build
npm start
```

2. **Verify Server Access**
- GraphQL Playground: http://localhost:4000
- REST API endpoint: http://localhost:5000/api/repositories
- Find your local IP address from Expo development tools

#### Step 2: HTTP Requests with Fetch API

1. **Basic Fetch Implementation**
```javascript
// Replace mock data in RepositoryList component
import { useState, useEffect } from 'react';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    // Replace IP address with your own!
    const response = await fetch('http://192.168.1.33:5000/api/repositories');
    const json = await response.json();
    console.log(json);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      // Other props
    />
  );
};
```

2. **Create useRepositories Hook**
```javascript
// src/hooks/useRepositories.js
import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    // Replace IP address with your own!
    const response = await fetch('http://192.168.1.33:5000/api/repositories');
    const json = await response.json();
    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
```

#### Step 3: GraphQL and Apollo Client Setup

1. **Install Dependencies**
```bash
npm install @apollo/client graphql
npm install @expo/metro-config@0.17.4
```

2. **Configure Metro Bundler**
```javascript
// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
```

3. **Create Apollo Client**
```javascript
// src/utils/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://192.168.1.100:4000/graphql', // Replace with your IP
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
```

4. **Setup Apollo Provider**
```javascript
// App.js
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
```

#### Step 4: GraphQL Queries and Organization

1. **Create GraphQL Structure**
```
src/
  graphql/
    queries.js
    mutations.js
    fragments.js
```

2. **Define Queries**
```javascript
// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
```

3. **Define Mutations**
```javascript
// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
```

4. **Update useRepositories Hook**
```javascript
// src/hooks/useRepositories.js
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return { 
    repositories: data?.repositories, 
    loading, 
    refetch 
  };
};

export default useRepositories;
```

#### Step 5: Environment Variables Configuration

1. **Install Dotenv**
```bash
npm install dotenv
```

2. **Rename app.json to app.config.js**
```javascript
// app.config.js
import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    env: process.env.ENV,
    apolloUri: process.env.APOLLO_URI,
  },
};
```

3. **Create .env File**
```env
ENV=development
APOLLO_URI=http://192.168.1.100:4000/graphql
```

4. **Update Apollo Client**
```javascript
// src/utils/apolloClient.js
import Constants from 'expo-constants';

const { apolloUri } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
  uri: apolloUri,
});
```

#### Step 6: Data Storage with AsyncStorage

1. **Install AsyncStorage**
```bash
npx expo install @react-native-async-storage/async-storage
```

2. **Create AuthStorage Class**
```javascript
// src/utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );
    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
```

### Phase 5 Detailed Steps: User Authentication

#### Step 1: Sign-in Mutation Implementation

1. **Create useSignIn Hook**
```javascript
// src/hooks/useSignIn.js
import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } }
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
```

2. **Update SignIn Component**
```javascript
// src/components/SignIn.jsx
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  // ... rest of component
};
```

#### Step 2: Context for Dependency Injection

1. **Create Auth Storage Context**
```javascript
// src/contexts/AuthStorageContext.js
import { createContext } from 'react';

const AuthStorageContext = createContext();

export default AuthStorageContext;
```

2. **Create useAuthStorage Hook**
```javascript
// src/hooks/useAuthStorage.js
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
```

3. **Provide Context in App Component**
```javascript
// App.js
import AuthStorageContext from './src/contexts/AuthStorageContext';

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};
```

#### Step 3: Sign-out Implementation

1. **Update AppBar Component**
```javascript
// src/components/AppBar.jsx
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab>Repositories</AppBarTab>
        {data?.me ? (
          <Pressable onPress={signOut}>
            <AppBarTab>Sign out</AppBarTab>
          </Pressable>
        ) : (
          <AppBarTab>Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};
```

### Exercise Checklist

#### Exercise 10.11: Fetching repositories with Apollo Client
- [ ] Setup Apollo Sandbox and test repositories query
- [ ] Replace Fetch API with GraphQL useQuery hook
- [ ] Use cache-and-network fetch policy
- [ ] Organize GraphQL queries in separate files

#### Exercise 10.12: Environment variables
- [ ] Create .env file with APOLLO_URI
- [ ] Rename app.json to app.config.js
- [ ] Configure environment variables access
- [ ] Use environment variables in Apollo Client

#### Exercise 10.13: Sign in form mutation
- [ ] Test authenticate mutation in Apollo Sandbox
- [ ] Create useSignIn hook with useMutation
- [ ] Implement sign-in functionality in SignIn component
- [ ] Log authentication result

#### Exercise 10.14: Storing access token
- [ ] Create AuthStorage class with AsyncStorage
- [ ] Implement getAccessToken, setAccessToken, removeAccessToken methods
- [ ] Use namespace for storage keys

#### Exercise 10.15: Complete sign-in flow
- [ ] Store access token after successful authentication
- [ ] Reset Apollo Client store after sign-in
- [ ] Redirect user to repositories list
- [ ] Handle authentication errors

#### Exercise 10.16: Sign out functionality
- [ ] Use me query to check authentication status
- [ ] Show "Sign out" tab for authenticated users
- [ ] Implement sign-out with token removal
- [ ] Reset Apollo Client store on sign-out

### Key Implementation Notes

1. **Network Configuration**
   - Use your local IP address, not localhost, for device testing
   - Ensure development machine and mobile device are on same Wi-Fi
   - Consider using ngrok for tunnel setup if needed

2. **Error Handling**
   - Always implement try-catch blocks for async operations
   - Log errors for debugging purposes
   - Provide user-friendly error messages

3. **Security Considerations**
   - Never store sensitive data in configuration files
   - Use SecureStore for highly sensitive data
   - Implement proper token validation

4. **Performance Optimization**
   - Use appropriate fetch policies for GraphQL queries
   - Implement loading states
   - Consider pagination for large datasets

5. **Development Workflow**
   - Test queries in Apollo Sandbox first
   - Use React DevTools for debugging
   - Monitor network requests and responses

---

**Note**: This is a living document that should be updated as the implementation progresses and requirements evolve.