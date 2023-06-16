"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  profilePic?: string;
  name?: string;
  message?: string;
  notifications?: string;
}
const ChatCard = ({ profilePic, name, message, notifications }: Props) => {
  const router = useRouter();
  useEffect(() => {
    console.log("se monta la chat card");
  }, []);
  return (
    <main
      onClick={() => router.push(`/home/chat/${name}`)}
      className="flex gap-4 h-18 bg-amber-300 rounded-3xl relative p-4"
    >
      <figure>Icon</figure>
      <article className="flex flex-col gap-2">
        <p>{name}</p>
        <p>{message}</p>
      </article>
      <aside className="absolute top-3 right-5">{notifications}</aside>
    </main>
  );
};

export default ChatCard;
