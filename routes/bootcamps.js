const express = require('express');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

// Include Other Resource Routers
const courseRouter = require('./courses');

// Initialize Router
const router = express.Router();

// Re-Route into Other Resource Routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;