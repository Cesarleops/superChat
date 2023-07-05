"use client";
import { BsArrowLeft } from "react-icons/bs";
import { useSearch } from "@/hooks/useSearch";
import { useUserContext } from "@/context/store";

type IUser = {
  id: string;
  userName: string;
};
interface Props {
  onClick: () => void;
}
export const SearchModal = ({ onClick }: Props) => {
  const { data, handleChange, input } = useSearch();
  const { userState, socket } = useUserContext();
  const userId = localStorage.getItem("iden");

  return (
    <main className="absolute w-screen h-screen bg-white z-50 top-0 left-0">
      <section className="flex p-5 items-center gap-5">
        <BsArrowLeft onClick={() => onClick()} className="h-8 w-8" />
        <input
          type="text"
          name="search"
          onChange={handleChange}
          value={input}
          placeholder="Search"
          className="rounded-full border-2 border-terciary p-2"
        />
      </section>
      <section className="px-4">
        <article className="flex flex-col gap-2">
          {data.map((el: IUser) => (
            <article className="flex items-center gap-10" key={el.id}>
              <p className="text-2xl mr-auto">{el.userName}</p>
              <small
                className="bg-terciary text-base text-center p-2 rounded-xl"
                onClick={() => {
                  socket?.emit("addFriend", {
                    id: el.id,
                    from: userState.id ? userState.id : userId,
                  });
                }}
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
