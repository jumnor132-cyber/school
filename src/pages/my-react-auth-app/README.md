# My React Auth App

This project is a simple authentication application built with React. It includes features for user registration, login, and a protected dashboard that can only be accessed by authenticated users.

## Project Structure

```
my-react-auth-app
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── api
│   │   └── authApi.js      # API calls for authentication
│   ├── components
│   │   ├── AuthLayout.jsx   # Layout for authentication pages
│   │   ├── LoginForm.jsx     # Login form component
│   │   ├── RegisterForm.jsx  # Registration form component
│   │   └── DashboardLayout.jsx # Layout for the dashboard
│   ├── context
│   │   └── AuthContext.jsx   # Context for authentication state
│   ├── pages
│   │   ├── LoginPage.jsx      # Page for login
│   │   ├── RegisterPage.jsx   # Page for registration
│   │   └── DashboardPage.jsx   # Page for the dashboard
│   ├── routes
│   │   └── ProtectedRoute.jsx  # Protects routes for authenticated users
│   ├── styles
│   │   └── index.css          # Global styles
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Entry point for the React application
│   └── index.css              # Additional styles
├── .gitignore                 # Files to ignore by Git
├── package.json               # npm configuration file
├── vite.config.js             # Vite configuration settings
└── README.md                  # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-react-auth-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Features

- User registration and login forms
- Protected routes that require authentication
- Simple and clean user interface
- Responsive design

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.