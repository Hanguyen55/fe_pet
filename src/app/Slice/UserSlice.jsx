import userApi from "../../api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userData = createAsyncThunk("users/userData", async () => {
  const user = await userApi.checkUser();
  return user;
});
export const userInfor = createAsyncThunk("users/userInfor", async (id) => {
  const user = await userApi.getOne(id);
  return user;
});
const User = createSlice({
  name: "users",
  initialState: {
    user: [],
    userInfor: [],
    loading: true,
    error: "",
  },
  reducers: {
    // inforUser: (state, action) => {
    //     userApi.postuser(action.payload);
    // },
  },
  extraReducers: {
    [userData.pending]: (state) => {
      state.loading = true;
    },
    [userData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error;
    },
    [userData.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [userInfor.fulfilled]: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});
const { reducer, actions } = User;
// export const { inforUser } = actions;

export default reducer;
