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
- [ ] Set up project structure

### Phase 2: Core Components
- [ ] Create basic navigation structure
- [ ] Implement repository list view
- [ ] Add repository item components
- [ ] Style with React Native components

### Phase 3: Data Management
- [ ] Set up GraphQL client
- [ ] Implement repository data fetching
- [ ] Add state management (Context/Redux)
- [ ] Handle loading and error states

### Phase 4: User Features
- [ ] Implement user authentication
- [ ] Add login/register forms
- [ ] Create user profile management
- [ ] Implement review functionality

### Phase 5: Advanced Features
- [ ] Add sorting and filtering
- [ ] Implement pagination
- [ ] Add form validation
- [ ] Optimize performance

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

---

**Note**: This is a living document that should be updated as the implementation progresses and requirements evolve.