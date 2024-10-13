The application was developed for a company that provides online language lessons.
It consists of a database, an HTTP server with various functions, 
and a front-end part for a convenient user interface.

Frontend:

The frontend is implemented using React with the Redux Toolkit for state management and react-router-dom for routing. The interface adapts to screens from 320px to 1440px, using a responsive layout based on the design.

Main Pages:

Home: Highlights company benefits and includes a "Getting Started" link leading to the "Teachers" page.
Teachers: Displays a list of teachers with filters for language, student level, and price.
Favorites: A private page for teachers added to "favorites."

Authorization forms are implemented using react-hook-form and yup. A feature for booking a trial lesson is included.

Authorization:

Users can register, log in (including via Google accounts), retrieve user data, and log out. Certain features are restricted for unauthorized users.

Backend

Technologies:
Server: Node.js with Express.js
Database: MongoDB with Mongoose
Image Storage: Cloudinary
Email Sending: SendGrid

Functionality:

User registration and login
Profile and avatar updates
Uploading files in form-data format with URL storage in the database
Sending support emails
Retrieving and filtering teachers with pagination
Managing favorite teachers
Securing routes with JWT

Main Endpoints:

POST /users/register: User registration
POST /users/login: Login
POST /users/avatar: Upload avatar
GET /teachers: Retrieve a list of teachers
POST /favorites/:teacherId: Add to favorites
DELETE /favorites/:teacherId: Remove from favorites

Deployment

HTTP Server:  https://teachers-rest-api.onrender.com   on Render.com 
Swagger:  https://teachers-rest-api.onrender.com/api/docs
Frontend:  https://teachers-puce.vercel.app/  on Vercel

This application allows users to easily find and interact with online language teachers.

