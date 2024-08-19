import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: null,
    myTweets: null,
    otherTweets: null,
    bookmarkedTweets: null, // State for bookmarked tweets
    refresh: false,
    isActive: true,
  },
  reducers: {
    setTweets: (state, action) => {
      state.tweets = action.payload;
    },
    setMyTweets: (state, action) => {
      state.myTweets = action.payload;
    },
    setOtherTweets: (state, action) => {
      state.otherTweets = action.payload;
    },
    setBookmarkedTweets: (state, action) => {
      state.bookmarkedTweets = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const {
  setTweets,
  setMyTweets,
  setOtherTweets,
  setBookmarkedTweets,
  setRefresh,
  setIsActive,
} = tweetsSlice.actions;

export default tweetsSlice.reducer;

// Async action to fetch bookmarked tweets
export const fetchBookmarkedTweets = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/tweet/bookmarks/${userId}`);
    dispatch(setBookmarkedTweets(response.data.tweets));
  } catch (error) {
    console.error("Error fetching bookmarked tweets:", error.message);
  }
};
