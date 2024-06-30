// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const authRoutes = require("./routes/authRoutes");
const visionRoutes = require('./routes/visionRoutes'); // Added vision routes
const employeeRoutes = require('./routes/employeeRoutes'); // Added employee routes
const invitationRoutes = require('./routes/invitationRoutes'); // Add this line
const organizationRoutes = require('./routes/organizationRoutes'); // Add this line
const subscriptionRoutes = require('./routes/subscriptionRoutes'); // Add this line for subscription routes
const tokenRoutes = require('./routes/tokenRoutes'); // Add this line at the top with other route imports
const profileRoutes = require('./routes/profileRoutes'); // Add this line with other route imports
const Vision = require('./models/Vision'); // Import Vision model
const { isAuthenticated, isAdmin } = require('./routes/middleware/authMiddleware');
const http = require('http');
const setupChatServer = require('./chatServer');

if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
  console.error("Error: config environment variables not set. Please create/edit .env configuration file.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting the templating engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));


// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });

// Session configuration with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  }),
);

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Logging session creation and destruction
app.use((req, res, next) => {
  const sess = req.session;
  // Make session available to all views
  res.locals.session = sess;
  if (!sess.views) {
    sess.views = 1;
    console.log("Session created at: ", new Date().toISOString());
  } else {
    sess.views++;
    console.log(
      `Session accessed again at: ${new Date().toISOString()}, Views: ${sess.views}, User ID: ${sess.userId || '(unauthenticated)'}`,
    );
  }
  next();
});

// Authentication Routes
app.use(authRoutes);

// Vision Routes
app.use(visionRoutes); // Integrating vision routes into the application

// Employee Routes
app.use(employeeRoutes); // Integrating employee routes into the application

// Invitation Routes
app.use(invitationRoutes); // Use invitation routes

// Organization Routes
app.use(organizationRoutes); // Use organization routes in the application

// Subscription Routes
app.use(subscriptionRoutes); // Use subscription routes in the application

// Token Routes
app.use(tokenRoutes); // Use token routes in the application

// Profile Routes
app.use(profileRoutes); // Use profile routes in the application

// Serve employees view
app.get('/employees', isAuthenticated, isAdmin, (req, res) => res.render('employees'));

// Root path response
app.get("/", (req, res) => {
  if (!req.session.userId) {
    console.log("Unauthorized access attempt, redirecting to login.");
    return res.redirect('/auth/login');
  }
  const organizationId = req.session.organizationId; // Example of retrieving organizationId from session
  if (organizationId) {
    Vision.findOne({ organizationId }) // Adjusted query based on the presence of organizationId
      .then(foundVision => {
        if (!foundVision) {
          console.log("No vision set for this organization, hiding vision message.");
        }
        res.render("index", { vision: foundVision || null });
      })
      .catch(err => {
        console.error(`Error fetching vision document: ${err.message}`, err);
        res.status(500).send("There was an error serving your request.");
      });
  } else {
    console.log("No organization ID found in session, rendering index without vision.");
    res.render("index", { vision: null });
  }
});

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  //res.status(404).send("Page not found.");
  return res.redirect('/auth/login');
});

// Enhanced Error handling for authorization issues
app.use((err, req, res, next) => {
  if (err.status === 401 || err.status === 403) {
    console.error(`Authorization error: ${err.message}`);
    console.error(err.stack);
    return res.status(err.status).send("You do not have permission to perform this action");
  }
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

const server = http.createServer(app);
setupChatServer(server);

// Replace app.listen with server.listen
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});