import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../reducers/Auth/authSlice";

export function useGetUser() {
    const dispatch = useDispatch();

    const { _id: userId } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getUser(userId) {
                await axios
                    .get(`/api/user/${userId}`)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(setUserData(res.data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            getUser(userId);
        },
        [userId, dispatch]
    );
}
