import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {
  deleteProgram,
  selectProgramDbEditStatus,
  resetEditStatus,
} from "./programsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

export default function AlertDialog({ id, open, setOpen, redirect }) {
  const dbStatus = useSelector(selectProgramDbEditStatus)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = async () => {
    dispatch(deleteProgram(id))
  }
  React.useEffect(() => {
    if (dbStatus === "success") {
      dispatch(resetEditStatus())
      handleClose()
      if (redirect) history.push(redirect)
    }
  }, [dbStatus])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm deletion?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go back
          </Button>
          <Button
            disabled={Boolean(dbStatus !== "idle")}
            onClick={handleDelete}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
