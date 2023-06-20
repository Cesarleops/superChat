"use client";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatFooter } from "./ChatFooter";

export const ChatBody = () => {
  const params = useParams();
  const { userState, socket, setActiveChat, setActiveChatId } =
    useUserContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);

  const SEND_MESSAGE_EVENT = "sendingMessage";
  const CLEAN_EVENT = "clean";
  const INCOMING_MESSAGE_EVENT = "incomingMessage";

  const handleNewMessage = async (message: any) => {
    try {
      socket?.emit(SEND_MESSAGE_EVENT, {
        sendedBy: userState.id,
        recievedBy: params.id,
        message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { ownMessage: true, message },
      ]);

      await axios.post("http://localhost:8000/api/users/conversation", {
        sendedBy: userState.id,
        recievedBy: params.id,
        message,
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  useEffect(() => {
    const initialConversation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/users/conversation?memberId1=${userState.id}&memberId2=${params.id}`
        );
        setMessages(data);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    initialConversation();
  }, [userState.id, params.id]);

  useEffect(() => {
    setActiveChat(true);
    setActiveChatId(params.id);

    return () => {
      setActiveChat(false);
      setActiveChatId("");
    };
  }, []);

  useEffect(() => {
    socket?.emit(CLEAN_EVENT, {
      sendedBy: userState.id,
      recievedBy: params.id,
    });
    return () => {
      socket?.emit(CLEAN_EVENT, {
        sendedBy: userState.id,
        recievedBy: params.id,
      });
    };
  }, [userState.id, params.id, socket]);

  useEffect(() => {
    if (incomingMessage) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage]);

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      console.log(data);
      setIncomingMessage({
        ownMessage: false,
        message: data,
      });
    };

    socket?.on(INCOMING_MESSAGE_EVENT, handleIncomingMessage);

    return () => {
      socket?.off(INCOMING_MESSAGE_EVENT, handleIncomingMessage);
    };
  }, [socket]);

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
        setNewMessage={setNewMessage}
      />
    </section>
  );
};
