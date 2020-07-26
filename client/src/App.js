import React from "react"
import { Switch, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"
import NewProgramForm from "./features/programs/NewProgramForm"
import MyPrograms from "./features/programs/MyPrograms"
import AllPrograms from "./features/programs/AllPrograms"
import ProgramDetail from "./features/programs/ProgramDetail"
import Navbar from "./layout/Navbar"

import { fetchAuthState } from "./features/auth/authSlice"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "40px",
    },
  },
}))

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthState())
  })
  return (
    <div>
      <Route exact path="/*" component={Navbar}></Route>
      <div className={classes.container}>
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/my-programs" component={MyPrograms}></Route>
          <Route exact path="/all-programs" component={AllPrograms}></Route>
          <Route exact path="/new-program" component={NewProgramForm}></Route>
          <Route exact path="/programs/:id" component={ProgramDetail}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
