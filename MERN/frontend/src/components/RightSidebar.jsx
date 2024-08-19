import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (query === "") {
      setFilteredUsers(otherUsers || []);
    } else {
      setFilteredUsers(
        otherUsers?.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        ) || []
      );
    }
  }, [query, otherUsers]);

  const displayedUsers = showAll ? filteredUsers : filteredUsers.slice(0, 5);

  return (
    <div className="w-[20%] mr-20">
      <div className="w-full text-center rounded-3xl pl-10 bg-gray-100 flex items-center p-2 shadow-md">
        <CiSearch size="24px" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="ml-5 w-full mr-3 font-light outline-none bg-transparent"
        />
      </div>
      <div className="bg-gray-100 rounded-xl shadow-lg mt-4 p-4">
        <h1 className="font-semibold text-lg w-full mb-4">Who to Follow</h1>

        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <div key={user?.username} className="flex items-center p-4">
              <div className="flex-shrink-0">
                <Avatar
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
          size="40"
                  round={true}
                />
              </div>
              <div className="flex justify-between w-full ml-4">
                <div className="w-3/4">
                  <h1 className="font-bold truncate">
                    {user?.name?.length > 10
                      ? `${user.name.substring(0, 10)}...`
                      : user.name}
                  </h1>
                  <p className="text-gray-500  text-sm truncate">
                    @{user?.username?.length > 12
                      ? `${user.username.substring(0, 12)}...`
                      : user.username}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link to={`profile/${user?._id}`}>
                    <button className="bg-black ml-2 text-white px-4 py-2 hover:bg-white hover:text-black hover:border border-black rounded-full transition-all">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        <div className="flex justify-center p-4">
          {showAll && filteredUsers.length > 5 ? (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowAll(false)}
            >
              See Less
            </button>
          ) : (
            filteredUsers.length > 5 && (
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowAll(true)}
              >
                See All
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
