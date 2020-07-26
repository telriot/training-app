import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Typography, CircularProgress } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthorizedUser } from "../auth/authSlice"
import { fetchMyPrograms, selectProgramsDbLoadingStatus } from "./programsSlice"
import ProgramCard from "./ProgramCard"
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
function MyPrograms() {
  const classes = useStyles()

  const user = useSelector(selectAuthorizedUser)
  const loadingStatus = useSelector(selectProgramsDbLoadingStatus)
  const programs = useSelector((state) =>
    state.programs.entities.filter((program) => user._id === program.author)
  )

  const dispatch = useDispatch()
  React.useEffect(() => {
    user && dispatch(fetchMyPrograms(user._id))
  }, [dispatch, user])
  return (
    <Container>
      <Typography variant="h4">My Programs</Typography>
      {loadingStatus === "success" ? (
        programs.map((program, index) => (
          <ProgramCard key={`program-${index}`} program={program} />
        ))
      ) : (
        <CircularProgress size={40} thickness={3} />
      )}
    </Container>
  )
}

export default MyPrograms
