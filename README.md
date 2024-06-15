1. Setting up the project struture:

auth-mysql/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js                  // For the register and login of an user
│ └── userController.js              //For the profile section of the logged user
├── middleware/
│ └── auth.js                //Authentication os the user for the profile section
├── models/
│ └── user.js                //Models are defined for the database
├── routes/
│ └── authRoutes.js
├── tests/
│ ├── auth.test.js
│ └── setup.js
├── .env
├── app.js
└── package.json
└── jest.config.js

2.  initialize the project and install dependencies:
    i) Create a folder named auth-mysql and open it up with VS code Editor.

        ii) Open the terminal in the vs code and install (just copy and paste it):

           npm init -y
           npm install express sequelize mysql2 bcryptjs jsonwebtoken dotenv

3.  Configure the environment variables (.env file).

4.  Then copy each of the code by matching the directory and name suggestions
5.  To run the project, type node app.js on the terminal

6.      POST /register to register a new user.
        POST /login to log in a user and get a JWT.
        GET /profile to retrieve the logged-in user's profile information (protected endpoint).

7.  Testing of the project : 1) Unit Testing 2) Integration Testing

8.  For testing install dependencies:
    npm install --save-dev jest supertest

9.  Jest Configuration (jest.config.js)

10. Test Setup File (tests/setup.js)

11. Integration Tests for Authentication (tests/auth.test.js)

12. Unit Tests for Authentication Logic (tests/authController.test.js)

13. Running the Tests
    To run the tests, add the following script to your package.json:
    "scripts": {
    "test": "jest"
    }
    
     Then, run the tests using:
          npm test
