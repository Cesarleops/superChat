"use client";

import { useUserContext } from "@/context/store";
import { MdSend } from "react-icons/md";

interface Props {
  setNewMessage(arg: string): void;
  handleNewMessage(e: React.FormEvent, arg: string): void;
  newMessage: string;
  whoImTalkingTo: string;
}

export const ChatFooter = ({
  setNewMessage,
  handleNewMessage,
  newMessage,
  whoImTalkingTo,
}: Props) => {
  const { socket } = useUserContext();
  const typing = () => {
    socket?.emit("typing", whoImTalkingTo);
  };
  return (
    <section className="fixed bottom-0 w-screen flex items-center bg-secondary p-3">
      <form className="h-9 flex items-center gap-10">
        <input
          type="text"
          className="rounded-2xl w-[300px] p-2 mr-auto"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          name="chatInput"
          onKeyDown={typing}
        />
        <button type="submit" onClick={(e) => handleNewMessage(e, newMessage)}>
          <MdSend className="h-10 w-10  text-white" />
        </button>
      </form>
    </section>
  );
};
