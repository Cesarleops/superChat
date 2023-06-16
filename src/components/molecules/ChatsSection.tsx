"use client";
import { useUserContext } from "@/context/store";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";

export const ChatsSection = () => {
  const { userState } = useUserContext();
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    const chats = await fetch(
      `http://localhost:8000/api/users/conversation/${userState.id}`
    );
    const chats2 = await chats.json();
    setChats(chats2);
  };
  useEffect(() => {
    getChats();
  }, []);
  return (
    <main>
      <section className="flex flex-col gap-4">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatCard
              key={Math.random()}
              name={chat.members}
              message={chat.messages.message}
              notifications={chat.unreadMessages}
            />
          ))
        ) : (
          <p>Loading</p>
        )}
      </section>
    </main>
  );
};
