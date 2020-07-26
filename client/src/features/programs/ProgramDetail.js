import React from "react"
import {
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import {
  fetchProgram,
  selectProgramDbEditStatus,
  selectProgramsDbLoadingStatus,
} from "./programsSlice"
import DeleteProgramDialog from "./DeleteProgramDialog"
import ExerciseItem from "./ExerciseItem"
import ExerciseHeader from "./ExerciseHeader"
function ProgramDetail() {
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const program = useSelector((state) => state.programs.currentProgram)
  const loadingStatus = useSelector(selectProgramsDbLoadingStatus)
  const dbStatus = useSelector(selectProgramDbEditStatus)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const readyToRender = Boolean(
    loadingStatus === "success" && program && program._id === params.id
  )
  const handleClickDelete = async () => {
    setDialogOpen(true)
  }

  React.useEffect(() => {
    dispatch(fetchProgram(params.id))
  }, [dispatch, params.id])
  return (
    <>
      <Container>
        {readyToRender ? (
          <>
            <Typography variant="h3">{program.title}</Typography>
            <ExerciseHeader />
            {program.exercises.map((exercise, index) => (
              <ExerciseItem key={`exercise-${index}`} exercise={exercise} />
            ))}
            <Button
              disabled={Boolean(dbStatus !== "idle")}
              variant="contained"
              color="secondary"
              onClick={handleClickDelete}
            >
              Delete
            </Button>
          </>
        ) : (
          <CircularProgress size={40} thickness={3} />
        )}
      </Container>
      <DeleteProgramDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        id={program._id}
        redirect="/my-programs"
      />
    </>
  )
}

export default ProgramDetail
