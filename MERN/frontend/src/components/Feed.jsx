  import React from "react";
  import CreatPost from "./CreatPost";
  import Tweet from "./Tweets";
  import { useSelector } from "react-redux";

  const Feed = () => {
    const { tweets } = useSelector((store) => store.tweet);
    return (
      <div className="w-[40%]">
        <div>
          <CreatPost />
          {
          tweets?.map((tweet) => (
            <Tweet key={tweet?._id} tweet={tweet} />
          ))}
        </div>
      </div>
    );
  };

  export default Feed;
