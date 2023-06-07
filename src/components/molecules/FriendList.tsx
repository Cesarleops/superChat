"use client";
import { AiOutlineSearch } from "react-icons/ai";
import FriendCard from "./FriendCard";
import { useFriends } from "@/hooks/useFriends";

export const FriendList = () => {
  const data = useFriends();
  console.log(data);
  return (
    <section className="flex gap-5 pl-2 pb-3">
      {data.length > 0 ? (
        data.map((user) => <FriendCard key={user._id} name={user.userName} />)
      ) : (
        <article>Add a Friend</article>
      )}
      <AiOutlineSearch />
    </section>
  );
};
