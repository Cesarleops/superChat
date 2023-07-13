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
 
  
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/users?name=${input}&id=${userState.id}`
      );
      console.log(data)
      const newData = data.filter((u:SearchedUser) => u.userName !== userState.userName)
      setData(newData);
    };
    fetchUsers();
  }, [input, userState.id, userState.userName]);

  return {
    data,
    input,
    handleChange
}
}