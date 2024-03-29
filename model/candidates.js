const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  votes: [
    {
      // user jo vote denge uski id store hogi or jis time diya hai vo store hoga
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCound: {
    type: Number,
    default: 0,
  },
});

const candidate = mongoose.model("user", userSchema);
module.exports = candidate;
