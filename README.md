# TuitionApp

A **Mauritian Tuition App** designed to streamline course management and provide a seamless experience for students and teachers alike. Built with **Node.js**, **Express**, **MongoDB**, and styled with modern CSS, the app is responsive, dynamic, and user-friendly.

---

## Features
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Interactive UI**: Smooth transitions, hover effects, and a modern layout.
- **Course Management**: Easily browse and manage tuition courses.
- **Cart Functionality**: Add courses to the cart, check availability, and view out-of-stock status.
- **Modular Design**: Reusable components and clean code structure.
- **Backend Services**:
  - RESTful API for managing course data.
  - MongoDB for database storage.
- **Cross-Origin Resource Sharing**: Enabled via **CORS** middleware for secure API access.
- **Logging and Monitoring**: Uses **Morgan** for HTTP request logging.

---

## Tech Stack
- **Frontend**: HTML, CSS (Poppins font, modern responsive design).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (using MongoDB Node.js Driver and `mongosh` for shell management).
- **Middleware**:
  - `body-parser` for parsing incoming request bodies.
  - `cors` for cross-origin requests.
  - `morgan` for logging.
- **Templating**: Mustache for server-side rendering.
- **Development Tools**: 
  - `nodemon` for live server reloading.
  - `properties-reader` for managing configuration.

---

## Prerequisites
Before running this project, make sure you have:
- **Node.js** (v18.20.5 or later) installed.
- **MongoDB** installed and running.
- A basic understanding of JavaScript and Node.js.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tuitionapp.git
   cd tuitionapp

2. Install dependencies:

npm install

3. Configure your .env file:

Add your MongoDB connection string.
Add any other configuration keys as needed.

4. Start the development server:

npm start
By default, the app will run on http://localhost:3000.

## Folder Structure

tuitionapp/
├── server.js          # Entry point for the backend server
├── products.js        # Handles course data and logic
├── public/            # Contains static files (CSS, images)
│   ├── styles.css     # Main CSS file for styling
├── views/             # Mustache templates for server-side rendering
├── package.json       # Project metadata and dependencies
├── .env               # Environment variables (not included in the repo)
└── README.md          # Documentation


## Usage

### Endpoints
GET /courses: Fetch all available courses.
POST /cart: Add a course to the cart.
GET /cart: View items in the cart.
DELETE /cart/:id: Remove a course from the cart.

## CSS Highlights
Dynamic Hover Effects: Buttons and cards scale and change shadow on hover.
Accessibility: Out-of-stock courses are styled with muted colors and a not-allowed cursor.
Responsive Design: Adjusts gracefully to all screen sizes, ensuring usability on mobile devices.

## Scripts
npm start: Runs the app using nodemon for live server reloading.
npm test: Placeholder for future test cases.
Styling Breakdown
General Styling

body {
    background-color: #f8fafc; /* Light blue for background */
    font-family: 'Poppins', sans-serif;
    color: #333232; /* Dark gray text */
}

header {
    background: linear-gradient(45deg, #1e88e5, #42a5f5); /* Blue gradient header */
    padding: 20px;
    border-bottom: 4px solid #1565c0; /* Darker blue accent */
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}

### Cart and Course Styling

.cart-item {
    background: #ffffff;
    margin: 10px 0;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: transform 0.3s, box-shadow 0.3s;
}

.course-section {
    background: #ffffff;
    margin: 10px;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: calc(33.33% - 20px); /* 3 courses per row */
}

### Button and Modal Styling

button {
    background: #1e88e5;
    border-radius: 20px;
    padding: 10px 15px;
    color: white;
    border: none;
    transition: transform 0.3s, background-color 0.3s;
}

.modal {
    position: fixed;
    left: 35%;
    top: 10%;
    width: 30%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
}

### Media Queries for Responsiveness

@media (max-width: 1024px) {
    .course-section {
        width: calc(50% - 20px); /* 2 courses per row */
    }

    .modal {
        left: 10%;
        width: 80%;
    }
}

@media (max-width: 768px) {
    header {
        flex-direction: column;
        text-align: center;
    }

    .course-section {
        width: calc(100% - 20px); /* Single course per row */
    }

    .modal {
        left: 5%;
        width: 90%;
    }
}

## Acknowledgements
Node.js and Express for backend development.
MongoDB for database management.
Mustache for clean server-side rendering.
All contributors who helped make this app a success!
Contact
If you have any questions or suggestions, feel free to contact:

Author: Balati Albert Balati
Email: bbalati01@gmail.com
GitHub: balatibalati


---

This version of the README file integrates details about the app’s tech stack, setup instructions, usage, styling code, and responsiveness features, while maintaining a structured and professional format. Let me know if you need more customizations!






