/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from "@/context/store"
import axios from "axios";
import { useEffect, useState } from "react";

export const useFriends = () => {
    const {userState}= useUserContext()
    const [data, setData] = useState([])
    const fetchFriends = async() => {
        const {data} = await axios.get(`http://localhost:8000/api/users/friends/${userState.id}`)
        setData(data)
    };
    useEffect(()=>{
        fetchFriends()
    }, [])

    return data
}