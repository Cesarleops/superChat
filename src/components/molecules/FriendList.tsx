"use client";
import FriendCard from "./FriendCard";
import { useFriends } from "@/hooks/useFriends";
import { useState } from "react";
import { SearchModal } from "./SearchModal";
import { BsArrowRight } from "react-icons/bs";
export const FriendList = () => {
  const data = useFriends();
  const [showingModal, setShowingModal] = useState(false);
  return (
    <main className="flex gap-5 pl-2 pb-3">
      {data ? (
        data.map((user) => (
          <FriendCard key={user.id} name={user.username} id={user.id} />
        ))
      ) : (
        <section className="flex items-center gap-5">
          <article className="flex gap-2 w-32 h-20 bg-emerald-500 rounded-3xl items-center justify-center p-2">
            <p>Go find some friends </p>
          </article>
        </section>
      )}
      <BsArrowRight
        className="w-10 h-10 p-3 bg-emerald-500 rounded-full"
        onClick={() => setShowingModal(!showingModal)}
      />
      {showingModal && (
        <SearchModal onClick={() => setShowingModal(!showingModal)} />
      )}
    </main>
  );
};
