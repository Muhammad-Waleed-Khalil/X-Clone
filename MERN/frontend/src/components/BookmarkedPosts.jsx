import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { BsBookmarks } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { setRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const BookmarkedPosts = () => {
  const { user } = useSelector((store) => store.user);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`/tweet/bookmarks/${user._id}`);
          console.log("API Response:", response.data); // Log the response for debugging
          setBookmarkedPosts(response.data.tweets);
        }
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, [user]);

  const likeOrDislikeHandler = async (id) => {
    try {
      await axios.put(
        `/tweet/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/tweet/delete/${id}`);
      dispatch(setRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading bookmarked posts...</p>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '1.5rem',
        width: '40%',
        backgroundColor: '#f3f4f6',
        padding: '2.5rem',
        overflowY: 'auto',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* Internet Explorer and Edge */
        scrollBehavior: 'smooth', /* Smooth scrolling */
      }}
      className="scroll-hidden"
    >
      <h2 className="text-3xl font-semibold mb-8">Bookmarked Posts</h2>
      {bookmarkedPosts.length === 0 ? (
        <p className="text-gray-500">No bookmarked posts yet.</p>
      ) : (
        bookmarkedPosts.map((post) => {
          const isLiked = post?.likes?.includes(user?._id);
          const isBookmarked = user?.bookmarks?.includes(post?._id);

          return (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full"
            >
              <div className="flex items-center mb-4">
                <Avatar
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                  size="50"
                  round={true}
                />
                <div className="ml-4">
                  <h1 className="font-bold text-lg">{post?.userDetails[0]?.name || "Unknown User"}</h1>
                  <p className="text-gray-500 text-sm">{`@${post?.userDetails[0]?.username || "unknown"}`}</p>
                </div>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <p className="text-gray-800">{post?.description}</p>
              </div>
           
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookmarkedPosts;
