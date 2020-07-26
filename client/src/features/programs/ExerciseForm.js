import React from "react"
import { IconButton, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  title: {
    width: "200px",
  },
  numberInput: {
    width: "50px",
    marginLeft: theme.spacing(2),
  },
  iconButton: {
    alignSelf: "center",
    justifySelf: "center",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
}))

function ExerciseForm({ onAdd }) {
  const classes = useStyles()
  const [name, setName] = React.useState("")
  const [series, setSeries] = React.useState("")
  const [reps, setReps] = React.useState("")
  const [weight, setWeight] = React.useState("")
  const [rest, setRest] = React.useState("")

  const handleChangeName = (e) => setName(e.target.value)
  const handleChangeSeries = (e) => setSeries(e.target.value)
  const handleChangeReps = (e) => setReps(e.target.value)
  const handleChangeWeight = (e) => setWeight(e.target.value)
  const handleChangeRest = (e) => setRest(e.target.value)
  const exercise = { name, series, reps, weight, rest }

  const resetFields = () => {
    setName("")
    setSeries("")
    setReps("")
    setWeight("")
    setRest("")
  }
  const handleClickAdd = (exercise) => () => {
    onAdd(exercise)
    resetFields()
  }
  const valueFields = [
    { label: "series", value: series, onChange: handleChangeSeries },
    { label: "reps", value: reps, onChange: handleChangeReps },
    { label: "weight", value: weight, onChange: handleChangeWeight },
    { label: "rest", value: rest, onChange: handleChangeRest },
  ]

  return (
    <div className={classes.container}>
      <TextField
        className={classes.title}
        id="exercise-name"
        label="Exercise name"
        value={name}
        onChange={handleChangeName}
      />
      {valueFields.map((item) => (
        <TextField
          className={classes.numberInput}
          id={`exercise-${item.label}`}
          label={item.label}
          value={item.value}
          onChange={item.onChange}
          type="number"
          InputLabelProps={{
            shrink: true,
            style: { textTransform: "capitalize" },
          }}
        />
      ))}

      <IconButton
        className={classes.iconButton}
        variant="contained"
        onClick={handleClickAdd(exercise)}
      >
        <AddIcon color="primary" />
      </IconButton>
    </div>
  )
}

export default ExerciseForm
