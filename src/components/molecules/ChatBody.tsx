"use client";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatFooter } from "./ChatFooter";
import { useChat } from "@/hooks/useChat";

export const ChatBody = () => {
  const params = useParams();

  const { messages, handleNewMessage, setNewMessage, newMessage } =
    useChat(params);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
  };

  console.log(messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <section
      ref={chatBodyRef}
      className="flex-1 flex flex-col overflow-y-scroll"
    >
      <div className="p-3 mb-20 flex flex-col flex-1 gap-3">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div
              className={` w-fit h-auto p-2 rounded-md ${
                m.ownMessage
                  ? "self-start bg-primary text-secondary"
                  : "self-end bg-terciary"
              }`}
              key={Math.random()}
            >
              <p>{m.message}</p>
            </div>
          ))
        ) : (
          <div>Hablen putitos</div>
        )}
      </div>
      <ChatFooter
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        setNewMessage={setNewMessage}
      />
    </section>
  );
};
