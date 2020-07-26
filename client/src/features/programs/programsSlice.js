import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  entities: [],
  currentProgram: {},
  dbEditStatus: "idle",
  status: "idle",
  error: null,
  toBeDeleted: null,
}
export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    const response = await axios.get("/api/programs/")
    return response.data
  }
)
export const fetchMyPrograms = createAsyncThunk(
  "programs/fetchMyPrograms",
  async (userId, thunkAPI) => {
    const response = await axios.get(`/api/programs/${userId}`)
    return response.data
  }
)
export const fetchProgram = createAsyncThunk(
  "programs/fetchProgram",
  async (programId, thunkAPI) => {
    const response = await axios.get(`/api/programs/detail/${programId}`)
    return response.data
  }
)
export const addNewProgram = createAsyncThunk(
  "posts/addNewProgram",
  async (program) => {
    const response = await axios.post("/api/programs/new", { program })
    return response.data
  }
)
export const deleteProgram = createAsyncThunk(
  "programs/deleteProgram",
  async (programId, thunkAPI) => {
    await axios.delete(`/api/programs/${programId}`)
    return programId
  }
)

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    resetPrograms(state, action) {
      state.entities = []
    },
    resetEditStatus(state, action) {
      state.dbEditStatus = "idle"
    },
  },
  extraReducers: {
    [addNewProgram.fulfilled]: (state, action) => {
      state.dbEditStatus = "success"
      state.error = null
    },
    [addNewProgram.pending]: (state) => {
      state.dbEditStatus = "pending"
      state.error = null
    },
    [addNewProgram.rejected]: (state, action) => {
      state.dbEditStatus = "failure"
      state.error = action.error.message
    },
    [fetchMyPrograms.fulfilled]: (state, action) => {
      state.status = "success"
      state.entities = action.payload
      state.error = null
    },
    [fetchMyPrograms.pending]: (state) => {
      state.status = "pending"
      state.error = null
    },
    [fetchMyPrograms.rejected]: (state, action) => {
      state.status = "failure"
      state.error = action.error.message
    },
    [fetchProgram.fulfilled]: (state, action) => {
      state.status = "success"
      state.currentProgram = action.payload
      state.error = null
    },
    [fetchProgram.pending]: (state) => {
      state.status = "pending"
      state.error = null
    },
    [fetchProgram.rejected]: (state, action) => {
      state.status = "failure"
      state.error = action.error.message
    },
    [deleteProgram.fulfilled]: (state, action) => {
      state.dbEditStatus = "success"
      state.entities = state.entities.filter(
        (program) => program._id !== action.payload
      )
      state.error = null
      state.toBeDeleted = null
    },
    [deleteProgram.pending]: (state) => {
      state.dbEditStatus = "pending"
      state.error = null
    },
    [fetchProgram.rejected]: (state, action) => {
      state.status = "failure"
      state.error = action.error.message
    },
  },
})
export const { resetPrograms, resetEditStatus } = programsSlice.actions
export const selectProgramDbEditStatus = (state) => state.programs.dbEditStatus
export const selectProgramsDbLoadingStatus = (state) => state.programs.status
export default programsSlice.reducer
