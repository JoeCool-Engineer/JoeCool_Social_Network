const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUsers,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers)
.post(createUsers);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUsers);

module.exports = router;