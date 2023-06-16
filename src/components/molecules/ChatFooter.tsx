"use client";

import { useChat } from "@/hooks/useChat";
import { useState } from "react";
import { MdSend } from "react-icons/md";

export const ChatFooter = ({ setNewMessage, handleNewMessage, newMessage }) => {
  return (
    <section className="absolute bottom-0 w-full flex items-center bg-red-500 p-5 gap-4">
      <input
        type="text"
        className="rounded-2xl w-4/5 h-9"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <MdSend
        className="h-8 w-8"
        onClick={() => handleNewMessage(newMessage)}
      />
    </section>
  );
};
