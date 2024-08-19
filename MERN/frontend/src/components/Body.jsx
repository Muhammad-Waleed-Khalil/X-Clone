import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Feed from "./Feed";
import Profile from "./Profile";
import BookmarkedPosts from "./BookmarkedPosts";
import Explorer from "./Explorer";

const Body = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />, // Home component includes LeftSidebar and RightSidebar
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/bookmarks/:id",
          element: <BookmarkedPosts />,
        },
        {
          path: "/explorer",
          element: <Explorer />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default Body;
