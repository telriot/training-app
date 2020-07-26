var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const {
  getPrograms,
  postNewProgram,
  getMyPrograms,
  getProgram,
  deleteProgram,
} = require("../controllers/programs")

/* GET home page. */
router.get("/", asyncErrorHandler(getPrograms))
router.post("/new", asyncErrorHandler(postNewProgram))
router.get("/:id", asyncErrorHandler(getMyPrograms))
router.get("/detail/:id", asyncErrorHandler(getProgram))
router.delete("/:id", asyncErrorHandler(deleteProgram))
module.exports = router
