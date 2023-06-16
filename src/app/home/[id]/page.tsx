"use client";
import { io } from "socket.io-client";
import { ChatBody } from "@/components/molecules/ChatBody";
import { ChatFooter } from "@/components/molecules/ChatFooter";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect } from "react";

const ChatScreen = async ({ params }: Params) => {
  const socket = io("http://localhost:8000");
  useEffect(() => {
    console.log("se monta la chatSCreen");
  }, []);
  return (
    <main className="flex flex-col h-5/6">
      <ChatBody socket={socket} />
    </main>
  );
};

export default ChatScreen;
