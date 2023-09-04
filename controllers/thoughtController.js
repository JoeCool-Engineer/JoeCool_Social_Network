const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            // const thoughtObj = { thoughts };
            return res.status(200).json(thoughts)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single thought by Id
    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-_v').populate('username')

            if (!thought){
                return res.status(404).json({ message: 'No thoughts exists with this ID'})
            }
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    // Create a thought
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body)
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    // Update a thought by ID
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body},
                { runValidators: true, new: true }
            );
            if (!thought){
                return res.status(418).json({ message: 'No course by this ID'})
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
          }
    },

    // Delete a thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought){
                return res.status(404).json({ message: 'No thoughts exists with this ID'})
            }
            res.json({ message: 'Thought was successfully deleted'})
        } catch (err) {
            console.log(err);
            return res.status(500).res.json(err)
        }
    }
}