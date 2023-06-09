"use client";
import { BsArrowLeft } from "react-icons/bs";
import { useSearch } from "@/hooks/useSearch";
import axios from "axios";
import { useUserContext } from "@/context/store";

interface Props {
  onClick: () => void;
}
export const SearchModal = ({ onClick }: Props) => {
  const { data, handleChange, input } = useSearch();
  const { userState } = useUserContext();
  const addFriend = async (id, username) => {
    await axios.post(
      `http://localhost:8000/api/users/friends/${userState.id}`,
      {
        friends: {
          id: id,
          username: username,
        },
      }
    );
  };
  return (
    <main className="absolute w-screen h-screen bg-white z-50 top-0 left-0">
      <section className="flex p-5 items-center gap-5">
        <BsArrowLeft onClick={() => onClick()} className="h-8 w-8" />
        <input
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="Search a friend"
          className="rounded-full border-2 border-sky-700 p-2"
        />
      </section>
      <section className="px-4">
        <article className="flex flex-col gap-2">
          {data.map((el) => (
            <article className="flex" key={el._id}>
              <p>{el.userName}</p>
              <small
                className="bg-red-500"
                onClick={() => addFriend(el._id, el.userName)}
              >
                Add Friend
              </small>
            </article>
          ))}
        </article>
      </section>
    </main>
  );
};
