"use client";
import { BsArrowLeft } from "react-icons/bs";
import { useSearch } from "@/hooks/useSearch";
import axios from "axios";
import { useUserContext } from "@/context/store";

type IUser = {
  _id: string;
  userName: string;
};
interface Props {
  onClick: () => void;
}
export const SearchModal = ({ onClick }: Props) => {
  const { data, handleChange, input } = useSearch();
  const { userState } = useUserContext();
  const userId = localStorage.getItem("iden");
  const addFriend = async (id: string, username: string) => {
    await axios.post(
      `http://localhost:8000/api/users/friends/${
        userState.id ? userState.id : userId
      }`,
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
          className="rounded-full border-2 border-terciary p-2"
        />
      </section>
      <section className="px-4">
        <article className="flex flex-col gap-2">
          {data.map((el: IUser) => (
            <article className="flex items-center gap-10" key={el._id}>
              <p className="text-2xl">{el.userName}</p>
              <small
                className="bg-terciary text-base text-center p-3 rounded-xl"
                onClick={() => addFriend(el._id, el.userName)}
              >
                Connect!
              </small>
            </article>
          ))}
        </article>
      </section>
    </main>
  );
};
