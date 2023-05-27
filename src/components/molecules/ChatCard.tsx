"use client";
import { useRouter } from "next/navigation";

interface Props {
  profilePic?: string;
  name?: string;
  message?: string;
  notifications?: string;
}
const ChatCard = ({ profilePic, name, message, notifications }: Props) => {
  const router = useRouter();
  return (
    <main
      onClick={() => router.push(`/chat/${name}`)}
      className="flex gap-4 h-18 bg-amber-300 rounded-3xl relative p-4"
    >
      <figure>Icon</figure>
      <article className="flex flex-col gap-2">
        <p>Name</p>
        <p>Last message</p>
      </article>
      <aside className="absolute top-3 right-5">+10</aside>
    </main>
  );
};

export default ChatCard;
