import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsBookmarks } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const Tweets = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isLiked = tweet?.likes?.includes(user?._id);

  useEffect(() => {
    setIsBookmarked(user?.bookmarks?.includes(tweet?._id));
  }, [tweet?._id, user?.bookmarks]);

  const bookmarkHandler = async () => {
    try {
      const res = await axios.put(`/user/bookmark/${tweet?._id}`, { id: user?._id }, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(setRefresh());
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error bookmarking tweet:", error.message);
      toast.error("Failed to bookmark tweet.");
    }
  };

  const likeOrDislikeHandler = async (id) => {
    try {
      await axios.put(`/tweet/like/${id}`, { id: user?._id }, { withCredentials: true });
      dispatch(setRefresh());
    } catch (error) {
      console.error("Error liking/disliking tweet:", error.message);
      toast.error("Failed to like/dislike tweet.");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/tweet/delete/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(setRefresh());
    } catch (error) {
      console.error("Error deleting tweet:", error.message);
      toast.error("Failed to delete tweet.");
    }
  };

  return (
    <div className="p-5 border mb-2 mt-2 rounded-lg shadow-md">
      <div className="flex items-center p-4">
        <Avatar
          src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
          size="40"
          round={true}
        />
        <div className="flex items-center ml-2">
          <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
          <p className="ml-2 text-gray-500 text-sm">{`@${tweet?.userDetails[0]?.username}`}</p>
        </div>
      </div>
      <div className="ml-8 border border-gray-300 p-2 rounded-xl">
        <p>{tweet?.description}</p>
      </div>
      <div className="flex justify-around p-4 w-full mt-2">
        <div className="flex items-center">
          <div
            className="p-1 hover:bg-green-200 rounded-full cursor-pointer"
            onClick={() => likeOrDislikeHandler(tweet?._id)}
          >
            {isLiked ? <FaHeart size="29px" color="red" /> : <CiHeart size="29px" />}
          </div>
          <p className="ml-1">{tweet?.likes?.length}</p>
        </div>
        <div className="flex items-center">
          <div
            onClick={bookmarkHandler}
            className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
          >
            {isBookmarked ? <FaBookmark size="24px" color="black" /> : <BsBookmarks size="24px" />}
          </div>
          <p className="ml-1">{tweet?.bookmarks?.length || 0}</p>
        </div>
        {user?._id === tweet?.userID && (
          <div className="flex items-center">
            <div
              className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
              onClick={() => deleteHandler(tweet?._id)}
            >
              <MdDeleteOutline size="24px" />
            </div>
            <p className="ml-1">{tweet?.comments?.length || 0}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweets;
