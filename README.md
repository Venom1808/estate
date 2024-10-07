## Client
The client folder contains the frontend code, built with React.js. It handles the user interface, including property listings, user registration, login, and search functionality.

API
The api folder contains the backend API built with Node.js and Express.js. It connects to MongoDB to store and retrieve real estate data, handles authentication, and manages requests from the frontend.

Tech Stack
Frontend: React.js, HTML, CSS (or TailwindCSS), JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Real-time updates: Pusher.js (or Socket.io)
Features
User authentication and authorization (signup, login, JWT).
Property listings (create, read, update, delete).
Search properties by location, price, and other filters.
Real-time updates on new property listings.
Responsive and user-friendly design.
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/real-estate-project.git
cd real-estate-project
Install dependencies:

For the client (frontend):

bash
Copy code
cd client
npm install
For the API (backend):

bash
Copy code
cd api
npm install
Set up environment variables:
Create a .env file in the api directory with the following keys:

bash
Copy code
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the application:

For the client (development mode):

bash
Copy code
cd client
npm start
For the API (development mode):

bash
Copy code
cd api
npm run dev
Access the application:

Frontend: Open http://localhost:3000 in your browser.
Backend API: The API will run on http://localhost:5000.


Images related to the project.



Home page
![home1](https://github.com/alwaysAnsh/Real-Estate/assets/121539688/be3562b1-25dd-41b5-ae4c-01ad4bc669bb)

Sign-up
![sign-up](https://github.com/alwaysAnsh/Real-Estate/assets/121539688/dc59b4ae-8e1d-4e1c-93db-7f9ca9f2c325)

Sign-in
![sign-in](https://github.com/alwaysAnsh/Real-Estate/assets/121539688/3b583372-f4f5-49d0-b2f1-12ac357c9fe5)

Profile
![profile](https://github.com/alwaysAnsh/Real-Estate/assets/121539688/d61c983f-616e-406b-a082-fa20c3897414)

Create Listing Page
![create_listing](https://github.com/alwaysAnsh/Real-Estate/assets/121539688/1281f1ec-e313-4f36-9019-c27ab69ee3bf)

For any queries, reach me out at akashsharma1808@gmail.com
