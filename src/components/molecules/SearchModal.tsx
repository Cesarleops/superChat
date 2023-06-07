"use client";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearch } from "@/hooks/useSearch";

export const SearchModal = () => {
  const { data, handleChange, input } = useSearch();
  return (
    <main>
      <section>
        <input type="text" onChange={handleChange} value={input} />
        <AiOutlineSearch />
      </section>
      <section>
        <ul>
          {data.map((el) => (
            <li key={el._id}>{el.userName}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};
