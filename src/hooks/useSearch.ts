import { useUserContext } from "@/context/store";
import { SearchedUser } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const {userState} = useUserContext()
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
   setInput(e.currentTarget.value)
  }
  const userId = localStorage.getItem("iden");
  
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/users?name=${input}&id=${userState.id ? userState.id : userId}`
      );
      console.log(data)
      const newData = data.filter((u:SearchedUser) => u.userName !== userState.userName)
      setData(newData);
    };
    fetchUsers();
  }, [input, userId, userState.id, userState.userName]);

  return {
    data,
    input,
    handleChange
}
}