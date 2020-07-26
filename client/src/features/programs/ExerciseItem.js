import React from "react"
import { Typography, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: theme.spacing(2),
    alignItems: "center",
  },
  title: {
    width: "200px",
  },
  values: {
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
function ExerciseItem({ exercise, index, onDelete }) {
  const classes = useStyles()

  const handleClickDelete = (index) => () => {
    onDelete(index)
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="p">
        {exercise.name}
      </Typography>
      <Typography className={classes.values} variant="p">
        {exercise.series}
      </Typography>
      <Typography className={classes.values} variant="p">
        {exercise.reps}
      </Typography>
      <Typography className={classes.values} variant="p">
        {exercise.weight}
      </Typography>
      <Typography className={classes.values} variant="p">
        {exercise.rest}
      </Typography>
      <IconButton
        className={classes.iconButton}
        variant="contained"
        onClick={handleClickDelete(index)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default ExerciseItem
