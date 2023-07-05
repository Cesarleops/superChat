"use client";

import { useEffect, useRef, useState } from "react";
import { ChatFooter } from "./ChatFooter";
import { useChat } from "@/hooks/useChat";
import { useUserContext } from "@/context/store";

interface Props {
  params: {
    user: string;
    id: string;
  };
}
export const ChatBody = ({ params }: Props) => {
  const { messages, handleNewMessage, setNewMessage, newMessage } =
    useChat(params);
  const { socket } = useUserContext();
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollToBottom = () => {
    chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
  };
  useEffect(() => {
    socket?.on("isTyping", () => {
      setIsTyping(true);
    });
  }, [socket]);

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
          messages.map((m, i) => (
            <div
              className={` w-fit h-auto p-2 rounded-md ${
                m.ownMessage
                  ? "self-start bg-primary text-secondary"
                  : "self-end bg-terciary"
              }`}
              key={i}
            >
              <p>{m.message}</p>
            </div>
          ))
        ) : (
          <p>Start chatting</p>
        )}
      </div>
      {isTyping && (
        <p className=" bg-red-500 animate-pulse h-[40px] w-[40px]">Typing...</p>
      )}

      <ChatFooter
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        setNewMessage={setNewMessage}
        whoImTalkingTo={params.id}
      />
    </section>
  );
};
