import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates } from "../../utils/interfaces/states";

const initialState: IStates = {
  isCreatePostModalOpen: false,
  isErrorModalOpen: false,
  isAuth: false,
}

export const dataSlice = createSlice({
  name: "pageStates",
  initialState,
  reducers: {
    set_isCreatePostModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModalOpen = action.payload
    },
    set_isErrorModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isErrorModalOpen = action.payload
    },
    set_isAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    }
  }
})

export const {
  set_isCreatePostModalOpen,
  set_isErrorModalOpen,
  set_isAuth,
} = dataSlice.actions

export default dataSlice.reducer