const express = require('express');
const router = express.Router();

const userRoutes = require("./userController")
router.use('/api/users', userRoutes);

const thoughtRoutes = require("./thoughtController")
router.use('/api/thoughts', thoughtRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
