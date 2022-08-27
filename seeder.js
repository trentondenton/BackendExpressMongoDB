const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load ENV Variables
dotenv.config({ path: './config/config.env' });

// Load Models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

// Connect to DB
mongoose.connect(process.env.MONGO_URI)

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/dummy/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/dummy/courses.json`, 'utf-8'));

// Add to DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}