const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  programs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("User", UserSchema)
module.exports = User
