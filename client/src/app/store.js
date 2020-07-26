import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import programsReducer from "../features/programs/programsSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    programs: programsReducer,
  },
})
