"use client";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatFooter } from "./ChatFooter";
import { useChat } from "@/hooks/useChat";

interface Props {
  socket: Socket;
}

export const ChatBody = ({ socket }: Props) => {
  const params = useParams();
  const { userState } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);
  const initialConversation = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/users/conversation?memberId1=${userState.id}&memberId2=${params.id}`
    );
    setMessages(data);
  };

  const handleNewMessage = async (message: any) => {
    try {
      socket.emit("sendingMessage", {
        sendedBy: userState.id,
        recievedBy: params.id,
        message,
      });
      setMessages([...messages, { ownMessage: true, message }]);
      await axios.post("http://localhost:8000/api/users/conversation", {
        sendedBy: userState.id,
        recievedBy: params.id,
        message,
      });
      await axios.put(
        `http://localhost:8000/api/users/conversation/${userState.id}`
      );
    } catch (error) {
      console.log("esto salio mal", error);
    }
  };
  useEffect(() => {
    initialConversation();
    socket.emit("loged", userState.id);
  }, [userState.id, params.id]);

  useEffect(() => {
    incomingMessage && setMessages([...messages, incomingMessage]);
  }, [incomingMessage]);

  useEffect(() => {
    socket.on("incomingMessage", (data) => {
      console.log(data);
      setIncomingMessage({
        ownMessage: false,
        message: data,
      });
    });
  }, [messages, socket]);

  return (
    <section className="h-5/6 space-y-2 p-3 flex flex-col overflow-y-scroll">
      {messages.length > 0 ? (
        messages.map((m) => (
          <div
            className={`bg-red-500 w-fit h-auto p-2 rounded-md ${
              m.ownMessage ? "self-start" : "self-end"
            }`}
            key={Math.random()}
          >
            <p>{m.message}</p>
          </div>
        ))
      ) : (
        <div>Hablen putitos</div>
      )}
      <ChatFooter
        newMessage={newMessage}
        handleNewMessage={handleNewMessage}
        setNewMessage={setNewMessages}
      />
    </section>
  );
};
