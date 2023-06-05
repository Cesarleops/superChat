"use client";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const SearchModal = () => {
  const handleSearch = async (e: string) => {
    const data = await axios.get(`http:localhost:8000/api/friends/?name=${e}`);
  };
  return (
    <main>
      <section>
        <input type="text" />
        <AiOutlineSearch />
      </section>
      <section></section>
    </main>
  );
};
