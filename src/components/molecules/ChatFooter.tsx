"use client";

import { MdSend } from "react-icons/md";

interface Props {
  setNewMessage(arg: string): void;
  handleNewMessage(arg: string): void;
  newMessage: string;
}

export const ChatFooter = ({
  setNewMessage,
  handleNewMessage,
  newMessage,
}: Props) => {
  return (
    <section className="fixed bottom-0 w-screen flex items-center bg-primary p-5 gap-4">
      <input
        type="text"
        className="rounded-2xl w-4/5 h-9"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={() => handleNewMessage(newMessage)}>
        <MdSend className="h-8 w-8" />
      </button>
    </section>
  );
};
