const { Schema, model } = require('mongoose');
// const User = require('./User');
const reactionSchema = require('./Reaction');
const formatter = require('../utils/formatter')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => formatter(timestamp) 
    },
    username: {
        // type: Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true,
    },
    // reactions: [{type: Schema.Types.ObjectId, ref: 'Reaction'}],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       default: Schema.Types.ObjectId,
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxLength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//       virtuals: true,
//     },
//   }
// );



//  convert our thoughtSchema into a Model, using mongoose.model(modelName, schema) format
const Thought = model('thought', thoughtSchema);

module.exports = Thought;