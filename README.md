# 🏡 BuildEstate - House Rental Website

Welcome to **BuildEstate**, a modern and responsive house rental platform built using the MERN stack. This project allows users to browse, list, and manage rental properties seamlessly.

## Live Demo
🌐 [Live Website](https://real-estate-website-sepia-two.vercel.app/)

## Features
- 🔑 **User Authentication:** Secure sign-up and sign-in using Firebase Authentication.
- 📦 **Image Management:** Firebase Storage for storing property images.
- 🏡 **CRUD Operations:** Add, update, delete, and list properties.
- 🎯 **Search & Filter:** Search properties based on location and filters.
- 📊 **Responsive Design:** Mobile-friendly and fully responsive UI.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Image Storage:** Imagekit

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- ImageKit account
- Environment variables set up

### Setup Steps
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/BuildEstate.git
   cd BuildEstate
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Environment Variables
   Create `.env` files in both backend and frontend directories:

   Backend `.env`:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_key
   IMAGEKIT_PRIVATE_KEY=your_key
   IMAGEKIT_URL_ENDPOINT=your_endpoint
   ```

4. Start the application
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

## API Documentation

### Authentication Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Password reset request

### Property Endpoints
- `GET /api/products` - List all properties
- `POST /api/products` - Add new property
- `PUT /api/products/:id` - Update property
- `DELETE /api/products/:id` - Delete property

## Usage Examples

### Property Listing

## How to Contribute
- Fork the repository.
- Create a new branch: `git checkout -b feature-branch`
- Commit your changes: `git commit -m 'Add new feature'`
- Push to the branch: `git push origin feature-branch`
- Open a pull request.

## License
This project is licensed under the MIT License.

---
Made with ❤️ by **Aayush Vaghela**
