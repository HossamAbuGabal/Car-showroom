# CarLuck - Car Showroom Application

A modern, beautiful car showroom application with user authentication and profile management.

## Features

### 🔐 Authentication System
- **Login/Signup**: Beautiful, modern login and signup forms
- **Session Management**: Secure session-based authentication
- **Form Validation**: Real-time validation with user-friendly error messages
- **Password Security**: Bcrypt hashing for secure password storage

### 👤 User Profile Management
- **Personal Information**: Update name, email, phone number
- **Address Management**: Store and manage address information
- **Car Preferences**: Set preferred brands, budget, and fuel types
- **Favorites & Wishlist**: Track favorite vehicles and wishlist items
- **Profile Statistics**: View account statistics and member duration

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth transitions and hover effects
- **Modern Styling**: Clean, professional design with gradients and shadows
- **Interactive Elements**: Ripple effects, loading spinners, and feedback

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-showroom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create or update the `env.local` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SESSION_SECRET=your_session_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Access the application**
   Open your browser and go to `http://localhost:3000`

## Usage Guide

### For New Users (Students/Beginners)

#### 1. Creating an Account
1. Go to `http://localhost:3000/login`
2. Click on the "Sign Up" tab
3. Fill in your information:
   - **First Name**: Your first name
   - **Last Name**: Your last name
   - **Email**: A valid email address
   - **Phone Number**: Your phone number
   - **Password**: At least 6 characters
4. Check the "I agree to Terms & Conditions" box
5. Click "Create Account"

#### 2. Logging In
1. If you already have an account, click the "Login" tab
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the homepage

#### 3. Managing Your Profile
1. After logging in, click on "Profile" in the navigation
2. You'll see several tabs:
   - **Personal Info**: Update your basic information
   - **Preferences**: Set your car preferences
   - **Favorites**: View your favorite vehicles
   - **Wishlist**: View your wishlist items

#### 4. Setting Car Preferences
1. Go to the "Preferences" tab in your profile
2. Select your preferred car brands (BMW, Audi, Mercedes, etc.)
3. Set your budget range (minimum and maximum)
4. Choose your preferred fuel types
5. Click "Save Preferences"

#### 5. Logging Out
1. Click the "Logout" button in the top navigation
2. You'll be redirected to the login page

### How the System Works

#### Authentication Flow
1. **Signup**: Creates a new user account in the database
2. **Login**: Verifies credentials and creates a session
3. **Session Management**: Keeps you logged in across pages
4. **Logout**: Destroys the session and clears local storage

#### Profile Management
- All profile data is stored securely in MongoDB
- Changes are saved immediately to the database
- Profile information is used to personalize your experience

#### Security Features
- Passwords are hashed using bcrypt
- Sessions are managed securely
- Form validation prevents invalid data
- CSRF protection through session management

## Technical Details

### Backend Technologies
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **express-session**: Session management

### Frontend Technologies
- **EJS**: Template engine
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Boxicons**: Icon library

### Database Schema
```javascript
User {
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  phoneNumber: String (required)
  userType: String (enum: ['customer', 'admin'])
  passwordHash: String (required)
  favorites: [Vehicle IDs]
  wishlist: [Vehicle IDs]
  profilePicture: String
  address: {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }
  preferences: {
    preferredBrands: [String]
    budget: { min: Number, max: Number }
    fuelType: [String]
  }
  timestamps: true
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile Management
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

## Troubleshooting

### Common Issues

1. **"MongoDB Connection Error"**
   - Check your MongoDB connection string in `env.local`
   - Ensure MongoDB is running and accessible

2. **"Session not working"**
   - Verify `SESSION_SECRET` is set in `env.local`
   - Check that express-session is properly configured

3. **"Login not working"**
   - Ensure all required fields are filled
   - Check that the email format is valid
   - Verify password is at least 6 characters

4. **"Profile not loading"**
   - Make sure you're logged in
   - Check browser console for errors
   - Verify API endpoints are accessible

### Development Tips

1. **Check the console**: Look for error messages in the browser console
2. **Check server logs**: Monitor the terminal for server-side errors
3. **Clear browser data**: Clear localStorage if authentication issues persist
4. **Restart server**: Stop and restart the server if changes don't appear

## Contributing

This is a learning project designed for students. Feel free to:
- Add new features
- Improve the UI/UX
- Fix bugs
- Add more car-related functionality

## License

This project is for educational purposes.

---

**Happy coding! 🚗✨**