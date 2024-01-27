import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action)=>{
      // console.log(`save user context into store: ${action.payload.userData.$id}`)
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state)=>{
      state.status = false;
      state.userData = null;
    }

  }
})

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;