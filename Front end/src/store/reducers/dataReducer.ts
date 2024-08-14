import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates } from "../../utils/interfaces/states";

const initialState: IStates = {
  isModalOpen: false,
}

export const dataSlice = createSlice({
  name: "pageStates",
  initialState,
  reducers: {
    set_isModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
  }
})

export const {
  set_isModalOpen,
} = dataSlice.actions

export default dataSlice.reducer