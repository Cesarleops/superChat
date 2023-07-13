"use client";

import { useUserContext } from "@/context/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  profilePic?: string;
  name: string;
  message: {
    sendedBy: string;
    recievedBy: string;
    message: string;
  };
  notifications?: number;
  currentUser: string;
}
const ChatCard = ({
  profilePic,
  name,
  message,
  notifications,
  currentUser,
}: Props) => {
  const router = useRouter();
  const [newNotifications, setNewNotifications] = useState(notifications || 0);
  // const [lastMessage, setLastMessage] = useState(message.message);
  const { socket, userState } = useUserContext();

  const direction =
    userState.id !== message.sendedBy ? message.sendedBy : message.recievedBy;

  useEffect(() => {
    const handleNotis = (data: string) => {
      if (userState.activeChatId !== message.sendedBy) {
        if (data === message.sendedBy || data === message.recievedBy) {
          setNewNotifications((prev) => prev + 1);
        }
      }
    };
    socket?.on("newNotification", handleNotis);

    return () => {
      socket?.off("newNotification", handleNotis);
      if (
        userState.activeChatId === message.recievedBy ||
        userState.activeChatId === message.sendedBy
      ) {
        console.log("voy a limpiar las notificaciones de este chat");
        setNewNotifications(0);
      }
    };
  }, [
    message.recievedBy,
    message.sendedBy,
    socket,
    userState.activeChatId,
    userState.isActiveChat,
  ]);

  return (
    <main
      onClick={() => router.push(`/home/${currentUser}/${direction}`)}
      className="flex gap-4 h-18 bg-terciary rounded-3xl relative p-4"
    >
      <article className="flex flex-col gap-2">
        <p className="text-xl font-medium text-secondary">{name}</p>
        {/* <p>{lastMessage}</p> */}
      </article>
      <aside
        className={`text-xl font-medium absolute top-3 right-5 ${
          newNotifications === 0 ? "sr-only" : ""
        }`}
      >
        {newNotifications}
      </aside>
    </main>
  );
};

export default ChatCard;
