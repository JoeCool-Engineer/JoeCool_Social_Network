const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUsers,
  addFriend,
  deleteFriend,
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

  router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;