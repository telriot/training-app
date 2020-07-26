const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProgramSchema = new Schema({
  title: String,
  exercises: Array,
  notes: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Program = mongoose.model("Program", ProgramSchema)
module.exports = Program
