import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setError: (state, actions) => {
      state.error = actions.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
