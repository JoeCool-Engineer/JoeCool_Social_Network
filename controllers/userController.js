// const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // Get all Users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        const userObj = {
          users
        };
        return res.json(userObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single student
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          // .lean();
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
      // Create a user
    async createUsers(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

      // Delete a user 
  async deleteUsers(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },
    // Update a user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
        if (!user) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json({ message: "Friend added successfully" });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async deleteFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json({ message: "Friend deleted successfully" });
      } catch (err) {
        res.status(500).json(err);
      }
    }
}