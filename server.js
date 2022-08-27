const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger'); Using Morgan
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load ENV
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');


const app = express();

// Body Parser
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File Uploading
app.use(fileupload());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);


// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close Server & Exit Process
  server.close(() => process.exit(1));
})