import React from "react"
import { Container, TextField, Typography, Button } from "@material-ui/core"
import ExerciseForm from "./ExerciseForm"
import ExerciseItem from "./ExerciseItem"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { addNewProgram } from "./programsSlice"
import { selectAuthorizedUser } from "../auth/authSlice"
import {
  selectProgramDbEditStatus,
  resetEditStatus,
} from "../programs/programsSlice"
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  notes: {
    marginTop: theme.spacing(2),
  },

  buttonDiv: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}))

function NewProgramForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [title, setTitle] = React.useState("")
  const [exercises, setExercises] = React.useState([])
  const [notes, setNotes] = React.useState("")
  const user = useSelector(selectAuthorizedUser)
  const dbEditStatus = useSelector(selectProgramDbEditStatus)
  const handleChangeTitle = (e) => setTitle(e.target.value)
  const handleChangeNotes = (e) => setNotes(e.target.value)

  const handleSubmit = async () => {
    await dispatch(addNewProgram({ title, exercises, notes, user: user._id }))
    handleReset()
  }
  React.useEffect(() => {
    if (dbEditStatus === "success") {
      dispatch(resetEditStatus())
      history.push("/my-programs")
    }
  }, [dbEditStatus])

  const handleReset = () => {
    setTitle("")
    setExercises([])
    setNotes("")
  }
  const handleAddExercise = (exercise) => {
    setExercises((prevState) => [...prevState, exercise])
  }
  const handleDeleteExercise = (index) => {
    setExercises((prevState) => {
      return prevState.filter((el, i) => i !== index)
    })
  }
  const submitIsDisabled = Boolean(
    user === null || dbEditStatus !== "idle" || !title || !exercises.length
  )

  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h4">New Program</Typography>
        <TextField
          label="Program Title"
          value={title}
          onChange={handleChangeTitle}
        />
        <ExerciseForm onAdd={handleAddExercise} />
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={`exercise-${index}`}
            index={index}
            exercise={exercise}
            onDelete={handleDeleteExercise}
          />
        ))}
        <TextField
          className={classes.notes}
          label="Notes"
          value={notes}
          multiline
          rows={4}
          onChange={handleChangeNotes}
        />
        <div className={classes.buttonDiv}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitIsDisabled}
          >
            Save
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Container>
    </>
  )
}

export default NewProgramForm
