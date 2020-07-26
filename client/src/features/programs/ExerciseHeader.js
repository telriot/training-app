import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: theme.spacing(2),
    alignItems: "center",
  },
  exercise: {
    width: "200px",
  },
  values: {
    width: "50px",
    marginLeft: theme.spacing(2),
  },
}))
function ExerciseHeader() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography className={classes.exercise} variant="p">
        Exercise
      </Typography>
      <Typography className={classes.values} variant="p">
        Series
      </Typography>
      <Typography className={classes.values} variant="p">
        Reps
      </Typography>
      <Typography className={classes.values} variant="p">
        Weight
      </Typography>
      <Typography className={classes.values} variant="p">
        Rest
      </Typography>
    </div>
  )
}

export default ExerciseHeader
