"use client";
import { useFriends } from "@/hooks/useFriends";
import { ModalCard } from "./ModalCard";
import { FriendList } from "./FriendsList";

export const FriendsSection = () => {
  const data = useFriends();
  return (
    <main className="flex gap-5 pl-2 pb-3">
      {data ? (
        <FriendList data={data} />
      ) : (
        <section className="flex items-center gap-5">
          <article className="flex gap-2 w-32 h-20 bg-emerald-500 rounded-3xl items-center justify-center p-2">
            <p>Go find some friends </p>
          </article>
        </section>
      )}
      <ModalCard />
    </main>
  );
};
