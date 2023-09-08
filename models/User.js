const { Schema, model } = require('mongoose');
// const Thought = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    // thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
    // thoughts: [Thought],
    friends: [{type: Schema.Types.ObjectId, ref: 'user'}]
    // friends: [userSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`
});

//  convert our userSchema into a Model, using mongoose.model(modelName, schema) format
const User = model('user', userSchema);

module.exports = User;