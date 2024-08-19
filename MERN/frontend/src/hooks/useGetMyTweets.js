import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTweets, setRefresh, setIsActive } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const { refresh, isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const fetchTweets = async () => {
    try {
      const url = `/tweet/alltweets/${id}`;
      const res = await axios.get(url, { withCredentials: true });
      
      if (res.data && res.data.tweets) {
        dispatch(setTweets(res.data.tweets));
      } else {
        console.log("Tweets not found or incorrect response format");
      }
    } catch (error) {
      console.log("Error fetching tweets:", error.message);
    }
  };

  const followingTweetsHandler = async () => {
    try {
      const url = `/tweet/following/${id}`;
      const res = await axios.get(url, { withCredentials: true });
      
      if (res.data && res.data.tweets) {
        dispatch(setTweets(res.data.tweets));
      } else {
        console.log("Tweets not found or incorrect response format");
      }
    } catch (error) {
      console.log("Error fetching following tweets:", error.message);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchTweets();
    } else {
      followingTweetsHandler();
    }
  }, [refresh, isActive, id]); // Ensure `id` is included in dependencies
};

export default useGetMyTweets;
