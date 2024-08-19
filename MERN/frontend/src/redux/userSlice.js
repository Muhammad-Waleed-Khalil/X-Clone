import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    myProfile: null,
  },
  reducers: {
    //multiple actions
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setotherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      console.log("Updating myProfile:", action.payload);
      state.myProfile = action.payload;
    },
    followingUpdate: (state, action) => {
      // unfollow
      if (state.user?.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        // follow
        state.user?.following.push(action.payload);
      }
    },
  },
});
export const { setotherUsers, setuser, getMyProfile, followingUpdate } =
  userSlice.actions;
export default userSlice.reducer;
