import { useUserContext } from "@/context/store";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export interface IMessagesInterface {
    sendedBy?: string;
    recievedBy?: string;
    message: string;
    ownMessage?: boolean;
  }


  

export const useChat = (params: Params) => {

  const { userState, socket, setActiveChat, setActiveChatId } =
    useUserContext();
  const [messages, setMessages] = useState<Array<IMessagesInterface>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState<IMessagesInterface | null>(null);

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
      setNewMessage('')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const handleIncomingMessage = (data: string) => {
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

  return {
     messages,
     handleNewMessage,
     setNewMessage,
     newMessage
     
  }
}