import React, { useState } from "react";
import Avatar from "react-avatar"; // Ensure you have this library installed or replace with your Avatar component
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { setRefresh } from '../redux/tweetSlice'
import {setIsActive} from '../redux/tweetSlice'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const CreatPost = () => {
 
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const {isActive} =useSelector((store)=>store.tweet)
  const forYouHandler = () => dispatch(setIsActive(true))
  const followingHandler = () => dispatch(setIsActive(false))
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        "/tweet/create",
        { description, id: user?._id },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(setRefresh())
        setDescription("");
      }

    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };
 

  return (
    <div className="w-full shadow-md rounded-md">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
              } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${!isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
              } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div className="cursor-pointer">
              <Avatar
                src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="cursor-pointer">
              <CiImageOn size="24px" />
            </div>
            <button
              onClick={submitHandler}

              
              className="bg-[#1D9BF0] px-4 py-1 text-lg text-white border-none rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatPost;
