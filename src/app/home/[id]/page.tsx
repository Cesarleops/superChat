"use client";

import { ChatBody } from "@/components/molecules/ChatBody";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { socket } from "../page";

const ChatScreen = async ({ params }: Params) => {
  return (
    <main className="flex flex-col h-5/6">
      <ChatBody socket={socket} />
    </main>
  );
};

export default ChatScreen;
