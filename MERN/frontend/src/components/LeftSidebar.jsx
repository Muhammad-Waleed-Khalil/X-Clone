import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import {setTweets} from '../redux/tweetSlice'
import {setotherUsers,setuser,getMyProfile} from '../redux/userSlice'
const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const res = await axios.get(`/user/logout`);
    toast.success(res.data.msg);
    dispatch(setotherUsers(null));
    dispatch(setuser(null));
    dispatch(getMyProfile(null));
    dispatch(setTweets(null));
    navigate("/login");
  };

  return (
    <div className="w-[20%] ml-20 -mr-16">
      <div className="w-52">
        <div className="mb-10 ml-10 ">
          <img
            className="w-14"
            src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo-500x281.png"
            alt="Logo"
          />
        </div>
        <Link
          to="/"
          className="flex  items-center my-5 cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md"
        >
          <CiHome size="30px" />
          <h1 className="font-bold text-lg ml-2">Home</h1>
        </Link>
        <Link
          to="/explorer"
          className="flex items-center my-5 cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md"
        >
          <CiHashtag size="21px" />
          <h1 className="font-bold text-lg ml-2">Explorer</h1>
        </Link>
        <Link
          to={`/profile/${user?._id}`}
          className="flex  items-center my-5 cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md"
        >
          <VscAccount size="21px" />
          <h1 className="font-bold text-lg ml-2">Profile</h1>
        </Link>
        <Link to={`/bookmarks/${user?._id}`}>
          <div className="flex  items-center my-5 cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md">
            <CiBookmark size="24px" />
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
        </Link>
        
        <div
          onClick={logoutHandler}
          className="flex  items-center my-5 cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-md"
        >
          <BiLogOutCircle size="24px" />
          <h1 className="font-bold text-lg ml-2">Logout</h1>
        </div>
        <button className="py-2 px-5 w-48 bg-blue-500 rounded-full text-white font-bold text-lg hover:bg-white hover:text-blue-500 hover:border-blue-300">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
