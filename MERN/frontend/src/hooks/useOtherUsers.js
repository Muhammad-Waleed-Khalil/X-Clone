import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setotherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "/user/whoToFollow/" + id;

        const res = await axios.get(url, {
          withCredentials: true,
        });

        if (res.data && res.data.whoToFollow) {
          dispatch(setotherUsers(res.data.whoToFollow));
          // console.log("Dispatched profile:", res.data.whoToFollow);
        } else {
          console.log("Profile not found or incorrect response format");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUsers();
  }, [id, dispatch]);
};

export default useOtherUsers;
