# Rate Repository App

A React Native application for rating GitHub repositories, built following the Full Stack Open React Native course requirements.

## 🚀 Project Overview

This is a cross-platform mobile application built with React Native and Expo that allows users to rate and review GitHub repositories. The app displays a list of repositories with key statistics and information.

## 📱 Features Implemented

### ✅ Core Functionality
- **Repository List View**: Displays GitHub repositories with key information
- **Repository Statistics**: Shows stars, forks, reviews, and ratings
- **Responsive Design**: Clean UI with proper styling and layout
- **Navigation Ready**: React Navigation setup for future screen additions

### ✅ Technical Features
- **React Native Components**: Using native components for optimal performance
- **Custom Hooks**: Data management with custom React hooks
- **Modular Architecture**: Well-organized component structure
- **ESLint Integration**: Code quality and consistency checking
- **Mock Data System**: Repository data simulation for development

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **React Navigation**: Navigation library for screens
- **JavaScript/JSX**: Primary programming languages
- **ESLint**: Code linting and quality assurance

## 📁 Project Structure

```
rate-repository-app/
├── src/
│   ├── components/
│   │   ├── Main.jsx              # Main app component with navigation
│   │   └── RepositoryItem.jsx    # Individual repository display component
│   ├── screens/
│   │   └── RepositoryList.jsx    # Repository list screen
│   ├── hooks/
│   │   └── useRepositories.js    # Custom hook for repository data
│   ├── utils/
│   │   └── apolloClient.js       # GraphQL client configuration (ready for future use)
│   └── graphql/
│       └── queries.js            # GraphQL queries (ready for future use)
├── App.js                        # Root application component
├── package.json                  # Project dependencies and scripts
└── eslint.config.js             # ESLint configuration
```

## 🎯 Repository Display Features

Each repository item shows:
- **Repository Name**: Full GitHub repository name
- **Description**: Repository description
- **Owner Avatar**: Repository owner's profile picture
- **Statistics**: 
  - ⭐ Stars (formatted with k suffix for thousands)
  - 🍴 Forks (formatted with k suffix for thousands)
  - 📝 Reviews count
  - 📊 Average rating
- **Language Tag**: Primary programming language with styled badge

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0366d6` (GitHub blue for links and language tags)
- **Text Dark**: `#24292e` (Primary text color)
- **Text Light**: `#586069` (Secondary text color)
- **Background**: `#e1e5e9` (Light gray background)
- **Card Background**: `white` (Repository card backgrounds)

### Typography
- **Headers**: Bold, prominent text for repository names
- **Body Text**: Clean, readable descriptions and labels
- **Statistics**: Bold numbers with lighter labels

## 🚀 Getting Started

### Prerequisites
- Node.js (version 20 recommended)
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation & Running

1. **Clone and Install**:
   ```bash
   cd rate-repository-app
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Run on Different Platforms**:
   - **Web**: Press `w` in terminal or run `npm run web`
   - **iOS**: Press `i` in terminal or run `npm run ios`
   - **Android**: Press `a` in terminal or run `npm run android`

### Development Commands

- `npm start` - Start Expo development server
- `npm run lint` - Run ESLint code quality checks
- `npm run web` - Start web version
- `npm run android` - Start Android version
- `npm run ios` - Start iOS version

## 📱 Testing the App

### Web Browser Testing
1. Run `npm start`
2. Press `w` to open in browser
3. View the repository list with mock data

### Mobile Device Testing
1. Install Expo Go app on your device
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)
4. Ensure device is on same Wi-Fi network as development machine

## 🔄 Future Implementation Plans

### Phase 2: Authentication & User Management
- [ ] User registration and login
- [ ] User profile management
- [ ] Protected routes

### Phase 3: Real Data Integration
- [ ] Connect to GitHub API or custom GraphQL backend
- [ ] Implement Apollo Client data management
- [ ] Add loading states and error handling

### Phase 4: Review System
- [ ] Create repository reviews
- [ ] Rate repositories
- [ ] View review history

### Phase 5: Advanced Features
- [ ] Repository search and filtering
- [ ] Sorting options (stars, rating, date)
- [ ] Pagination for large datasets
- [ ] Offline support

## 🧪 Testing

The app includes mock data for immediate testing:
- **3 Sample Repositories**: Formik, React Async, React Native Typography
- **Realistic Data**: Proper GitHub-style statistics and information
- **Visual Testing**: Responsive design across different screen sizes

## 📋 Development Checklist

### ✅ Completed
- [x] Project initialization with Expo
- [x] ESLint configuration and setup
- [x] React Navigation implementation
- [x] Repository list UI implementation
- [x] Repository item component design
- [x] Mock data integration
- [x] Custom hooks for data management
- [x] Responsive styling and layout

### 🔄 Ready for Implementation
- [ ] Real API integration
- [ ] User authentication
- [ ] Review and rating functionality
- [ ] Advanced filtering and search

## 🤝 Contributing

This project follows the Full Stack Open course guidelines. To contribute:

1. Fork the repository
2. Create a feature branch
3. Follow ESLint rules and code style
4. Submit a pull request

## 📚 Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Full Stack Open Course](https://fullstackopen.com/en/part10)

## 📝 Notes

- This app is built for educational purposes following the Full Stack Open curriculum
- Mock data is used for development and testing purposes
- GraphQL infrastructure is prepared but not yet connected to a real backend
- The app is designed to be easily extensible with additional features

---

Built with ❤️ following Full Stack Open React Native curriculum