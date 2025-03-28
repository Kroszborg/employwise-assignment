# EmployWise User Management Application

## 📌 Project Overview

This project is a React TypeScript application that integrates with the Reqres API to perform basic user management functions. The application allows users to authenticate, view, search, edit, and delete user profiles.

### 🔗 Live Demo

[View the live demo here](https://employwise-assignment-blue.vercel.app/)

## ✨ Features

The application is structured into three levels of complexity:

### Level 1: Authentication
- User-friendly login screen
- Form validation with error messages
- Token-based authentication
- Secure routing with protected routes

### Level 2: User Listing
- Paginated list of users with responsive card layout
- Display of user profile images, names, and emails
- Pagination controls for navigating through user pages
- Client-side search and filtering functionality

### Level 3: User Management
- Edit user information with pre-filled forms
- Delete users with confirmation dialog
- Success and error notifications for all operations
- Seamless navigation between screens

### Bonus Features
- Real-time client-side search and filtering
- React Router implementation for seamless navigation
- Responsive design that works on all devices
- Comprehensive error handling

## 🛠️ Technologies Used

### Core Technologies
- **React 18**: Frontend library for building user interfaces
- **TypeScript**: For type safety and enhanced developer experience
- **Vite**: For fast development and optimal production builds

### State Management & Data Fetching
- **Context API**: For authentication state management
- **TanStack Query (React Query)**: For efficient data fetching, caching, and state updates
- **Axios**: For HTTP requests to the Reqres API

### Routing & Form Management
- **React Router DOM**: For application routing
- **React Hook Form**: For form state management and validation

### Styling
- **Tailwind CSS**: For responsive and customizable UI components
- **@tailwindcss/forms**: For enhanced form styling

## 📋 API Information

The application interacts with the [Reqres](https://reqres.in/) API:

- **Authentication**: `POST /api/login`
- **List Users**: `GET /api/users?page={pageNumber}`
- **Get User**: `GET /api/users/{id}`
- **Update User**: `PUT /api/users/{id}`
- **Delete User**: `DELETE /api/users/{id}`

> **Note**: Reqres is a mock API, so changes aren't actually persisted to a real database. It simulates responses only.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/employwise-assignment.git
   cd employwise-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Login Credentials

Use the following credentials to log in:
- **Email**: `eve.holt@reqres.in`
- **Password**: `cityslicka`

## 📂 Project Structure

```
employwise-assignment/
├── src/
│   ├── api/                # API service functions
│   │   └── apiService.ts   # Axios setup and API endpoints
│   ├── components/         # Reusable UI components
│   │   └── ProtectedRoute.tsx
│   ├── context/            # Context providers
│   │   └── AuthContext.tsx # Authentication context
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx
│   │   ├── UsersPage.tsx
│   │   └── EditUserPage.tsx
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles (Tailwind imports)
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## 🖥️ Implementation Details

### Authentication Flow

The application implements a secure authentication flow:

1. Users enter their credentials on the login page
2. Credentials are validated and sent to the Reqres API
3. On successful authentication, the returned token is stored in localStorage
4. The user is redirected to the protected Users page
5. If a user tries to access a protected route without authentication, they are redirected to the login page

### User Management

The application provides a complete set of user management features:

1. **Listing Users**: 
   - Fetches users with pagination
   - Displays user information in a responsive card layout
   - Provides pagination controls

2. **Searching Users**:
   - Implements client-side filtering
   - Searches across first name, last name, and email fields
   - Updates results in real-time as the user types

3. **Editing Users**:
   - Pre-fills form with existing user data
   - Validates all fields before submission
   - Provides success/error feedback

4. **Deleting Users**:
   - Confirms deletion intent
   - Removes user from the UI upon successful deletion
   - Handles API errors gracefully

### Error Handling

The application implements comprehensive error handling:

- Form validation errors with helpful messages
- API error responses with user-friendly notifications
- Loading states for all asynchronous operations
- Fallback UI for unexpected errors

### Responsive Design

The UI is fully responsive and works on devices of all sizes:

- Desktop: Multi-column grid layout
- Tablet: Two-column grid layout
- Mobile: Single-column layout with optimized spacing

## 🔍 Design Decisions & Considerations

### Why TanStack Query?

TanStack Query (formerly React Query) was chosen for data fetching because it provides:
- Automatic caching and background refetching
- Loading and error states management
- Easy invalidation and refetching of data
- Optimistic updates for a better user experience

### Why Context API instead of Redux?

For this application, Context API provides:
- Simpler implementation for authentication state
- Reduced boilerplate code
- Sufficient functionality for the application's needs
- Easier integration with React's component lifecycle

### Security Considerations

- Authentication token is stored in localStorage for persistence
- Protected routes prevent unauthorized access
- API requests include authorization headers when required
- Form inputs are validated to prevent malicious data

## 🔮 Future Improvements

Given more time, the application could be enhanced with:

- **Unit & Integration Tests**: Jest and React Testing Library for comprehensive test coverage
- **Improved Authentication**: Implement JWT refresh tokens and token expiration handling
- **Advanced User Management**: Add user creation functionality
- **Enhanced UI**: Add animations and transitions for a more polished user experience
- **State Persistence**: Remember search terms and pagination state when navigating back
- **Offline Support**: Implement service workers for offline capability

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Reqres](https://reqres.in/) for providing the API
- [React](https://reactjs.org/) and the React ecosystem
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
