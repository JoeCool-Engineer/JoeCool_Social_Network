const { Schema, model } = require('mongoose');
const User = require('./User');
const formatter = require('../utils/formatter')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: timestamp => formatter(timestamp) 
      },
      username: {
          type: String,
          required: true,
      },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

//  convert our reactionSchema into a Model, using mongoose.model(modelName, schema) format
// const reactionSchema = model('reaction', reactionSchema);

module.exports = reactionSchema;

