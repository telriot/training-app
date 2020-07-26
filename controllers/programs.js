const User = require("../models/User")
const Program = require("../models/Program")
module.exports = {
  getPrograms: async (req, res, next) => {
    console.log("programs")
  },
  postNewProgram: async (req, res, next) => {
    const { title, exercises, notes, user } = req.body.program
    console.log(req.body)
    const author = await User.findById(user)
    if (author) {
      const program = await Program.create({ title, exercises, notes, author })
      console.log(program)
      author.programs.push(program)
      author.save()
      const programObj = {
        date: program.date,
        author: user,
        title,
        exercises,
        notes,
        _id: program._id,
      }
      res.send(programObj)
    } else {
      res.status(401).send("You have to be logged in to create a new program")
    }
  },
  getMyPrograms: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("programs").exec()
    if (user) {
      res.send(user.programs)
    } else {
      res.status(401).send("You have to be logged in to retrieve your programs")
    }
  },
  getProgram: async (req, res, next) => {
    const program = await Program.findById(req.params.id)
    if (program) {
      res.send(program)
    } else {
      res.status(404).send("Program could not be found")
    }
  },
  deleteProgram: async (req, res, next) => {
    await Program.findByIdAndDelete(req.params.id)
    res.send("Program succesfully deleted")
  },
}
