import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { setRefresh } from "../redux/tweetSlice";
import Tweets from "./Tweets";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { user, myProfile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchUserTweets = async () => {
      try {
        const res = await axios.get(`/tweet/user/${id}`);
        setUserTweets(res.data.tweets);
        setPostCount(res.data.tweets.length);
      } catch (error) {
        console.error("Error fetching user tweets:", error.message);
        toast.error("Failed to fetch user tweets.");
      }
    };

    fetchUserTweets();
  }, [id]);

  const followAndUnfollowHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const endpoint = user?.following.includes(id) ? `/user/unfollow/${id}` : `/user/follow/${id}`;
      const res = await axios.post(endpoint, { id: user?._id });
      dispatch(followingUpdate(id));
      dispatch(setRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update follow status.");
    }
  };

  return (
    <div className="w-[40%] mx-auto border-l border-r shadow-lg p-3 sm:p-5 rounded-lg">
      {isEditing ? (
        <UpdateProfile userId={user?._id} />
      ) : (
        <>
          <div>
            <div className="flex items-center">
              <Link to="/" className="hover:bg-gray-200 rounded-full cursor-pointer p-2">
                <IoMdArrowBack size="20px" sm:size="26px" />
              </Link>
              <div className="ml-3">
                <h1 className="font-bold text-base sm:text-lg">{myProfile?.name}</h1>
                <p className="text-gray-500 text-xs sm:text-sm">{postCount} posts</p>
              </div>
            </div>
            <div className="mt-4">
              <img
                className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
                src="https://png.pngtree.com/thumb_back/fh260/background/20211009/pngtree-matrix-code-abstract-programming-background-image_908363.png"
                alt="Profile Background"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-12 sm:-top-16 left-2 sm:left-4 border-2 border-white rounded-full">
                <Avatar
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                  size="90"
                  sizeClass="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
                  round={true}
                />
              </div>
            </div>
          </div>
          <div className="text-right mt-2 sm:mt-4">
            {myProfile?._id === user?._id ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-block px-3 py-1 sm:px-4 sm:py-2 transition-all border font-bold text-sm sm:text-base bg-gray-200 cursor-pointer hover:bg-gray-100 border-gray-400 rounded-full"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followAndUnfollowHandler}
                className="inline-block px-3 py-1 sm:px-4 sm:py-2 transition-all border font-bold text-sm sm:text-base bg-black cursor-pointer text-white hover:text-black hover:bg-gray-100 border-gray-400 rounded-full"
              >
                {user?.following.includes(id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="mt-8 sm:mt-10">
            <h1 className="font-bold text-lg sm:text-xl">{myProfile?.name}</h1>
            <p className="text-base sm:text-lg">@{myProfile?.username}</p>
          </div>
          <div className="mt-2 sm:mt-4 text-xs sm:text-sm">
            <p>{myProfile?.description}</p>
          </div>
          <div className="mt-8">
            {userTweets.map((tweet) => (
              <Tweets key={tweet._id} tweet={tweet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
