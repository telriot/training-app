import React from "react"
import { Card, Typography, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import DeleteProgramDialog from "./DeleteProgramDialog"
import DeleteIcon from "@material-ui/icons/Delete"
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  contentDiv: {
    padding: theme.spacing(2),
    flex: 1,
    cursor: "pointer",
  },
  buttonDiv: {
    padding: theme.spacing(2),
  },
}))
function ProgramCard({ program }) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const history = useHistory()
  const classes = useStyles()
  const handleClickCard = () => {
    history.push(`/programs/${program._id}`)
  }
  const handleClickDelete = () => {
    setDialogOpen(true)
  }
  return (
    <>
      <Card className={classes.card}>
        <div className={classes.contentDiv} onClick={handleClickCard}>
          <Typography variant="h6">{program.title}</Typography>
          <Typography variant="p">{program.notes}</Typography>
        </div>
        <div className={classes.buttonDiv}>
          <IconButton onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
      <DeleteProgramDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        id={program._id}
      />
    </>
  )
}

export default ProgramCard
