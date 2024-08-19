


# MERN App Setup Guide

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Muhammad-Waleed-Khalil/X-Clone.git
   cd MERN
   ```

2. **Navigate to the frontend directory and install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up the `.env` file:**

   In the root directory of the backend, create a `.env` file with the following content:

   ```bash
   PORT=example
   MONGODB_URI=example
   JWT_SECRET=example
   ```

   Replace the `MONGODB_URI` with your own MongoDB connection string if you're using a different database setup.

5. **Run the application:**

   - **Frontend:**
     ```bash
     cd ../frontend
     npm start
     ```

   - **Backend:**
     ```bash
     cd ../backend
     npm start
     ```

   The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5173` (or the port you specified).

## Additional Information

- Ensure MongoDB is running locally or that you have a valid connection string if you're using a cloud-hosted database.
- The JWT secret should be kept secure and not shared publicly.
