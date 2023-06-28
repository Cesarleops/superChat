"use client";
import { useUserContext } from "@/context/store";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";

type TChats = {
  members: string;
  messages: string;
  unreadMessages: {
    amount: number;
  };
};
export const ChatsSection = () => {
  const { userState } = useUserContext();
  const [chats, setChats] = useState([]);
  const id = localStorage.getItem("iden");
  const getChats = async () => {
    const chats = await fetch(
      `http://localhost:8000/api/users/conversation/${
        userState.id ? userState.id : id
      }`
    );
    const chats2 = await chats.json();
    setChats(chats2);
  };
  useEffect(() => {
    console.log("se monto");
    getChats();
  }, []);
  return (
    <main>
      <section className="flex flex-col gap-4">
        {chats.length > 0 ? (
          chats.map((chat: TChats) => (
            <ChatCard
              key={Math.random()}
              name={chat.members}
              message={chat.messages}
              notifications={chat.unreadMessages.amount}
            />
          ))
        ) : (
          <p>Loading</p>
        )}
      </section>
    </main>
  );
};
