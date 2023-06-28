"use client";

import { useUserContext } from "@/context/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  profilePic?: string;
  name?: string;
  message?: string;
  notifications?: number;
}
const ChatCard = ({ profilePic, name, message, notifications }: Props) => {
  const router = useRouter();
  const [newNotifications, setNewNotifications] = useState(notifications || 0);
  const { socket, userState } = useUserContext();

  useEffect(() => {
    const handleNewNotification = () => {
      if (
        !userState.isActiveChat &&
        userState.activeChatId !== message.sendedBy
      ) {
        setNewNotifications((prevNotifications) => prevNotifications + 1);
        socket?.off("newNotification", handleNewNotification);
      }
    };

    socket?.on("newNotification", handleNewNotification);

    return () => {
      setNewNotifications(0);
    };
  }, [socket]);

  return (
    <main
      onClick={() => router.push(`/home/chat/${name}`)}
      className="flex gap-4 h-18 bg-terciary rounded-3xl relative p-4"
    >
      <figure>Icon</figure>
      <article className="flex flex-col gap-2">
        <p>{name}</p>
        <p>{message.message}</p>
      </article>
      <aside className="absolute top-3 right-5">{newNotifications}</aside>
    </main>
  );
};

export default ChatCard;
