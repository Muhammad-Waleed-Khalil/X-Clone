import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // console.log("Fetching profile for ID:", id);

                const url = '/user/profile/' + id;

                const res = await axios.get(url, {
                    withCredentials: true,
                });
                // console.log("Full response object:", res);
                // console.log("Response data:", res.data);
                
                
                if (res.data && res.data.profile) {
                    dispatch(getMyProfile(res.data.profile));
                    // console.log("Dispatched profile:", res.data.profile);
                } else {
                    // console.log("Profile not found or incorrect response format");
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        
        fetchProfile();
    }, [id,dispatch]);
};

export default useGetProfile;
