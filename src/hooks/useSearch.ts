import axios from "axios";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
   setInput(e.target.value)
  }
  const fetchUsers = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/users?name=${input}`
    );
    setData(data);
  };
  useEffect(() => {
    fetchUsers();
  }, [input]);

  return {
    data,
    input,
    handleChange
}
}