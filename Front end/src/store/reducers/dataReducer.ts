import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates } from "../../utils/interfaces/states";

const initialState: IStates = {
  isModalOpen: false,
  isAuth: false,
  userProfilePic: null
}

export const dataSlice = createSlice({
  name: "pageStates",
  initialState,
  reducers: {
    set_isModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    set_isAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    set_userProfilePic: (state, action: PayloadAction<string>) => {
      state.userProfilePic = action.payload
    }
  }
})

export const {
  set_isModalOpen,
  set_isAuth,
  set_userProfilePic,
} = dataSlice.actions

export default dataSlice.reducer