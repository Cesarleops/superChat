/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from "@/context/store"
import axios from "axios";
import { useEffect, useState } from "react";

export const useFriends = () => {
    const [data, setData] = useState([])
    const id = localStorage.getItem('iden')
    const fetchFriends = async() => {
        const {data} = await axios.get(`http://localhost:8000/api/users/friends/${id}`)
        setData(data)
    };
    useEffect(()=>{
        fetchFriends()
    }, [])

    return data
}