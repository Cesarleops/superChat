'use client'
import { useUserContext } from "@/context/store";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";


export interface IMessagesInterface {
    sendedBy?: string;
    recievedBy?: string;
    message: string;
    ownMessage?: boolean;
  }


 
  const SEND_MESSAGE_EVENT = "sendingMessage";
  const CLEAN_EVENT = "clean";
  const INCOMING_MESSAGE_EVENT = "incomingMessage"; 

export const useChat = (params: Params) => {
  
  const { userState, socket, setActiveChat, setActiveChatId } =
    useUserContext();
    console.log(userState.activeChatId)
  const [messages, setMessages] = useState<Array<IMessagesInterface>>([]);
  const [newMessage, setNewMessage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState<IMessagesInterface | null>(null);

  const id = localStorage.getItem('iden')
 
  const handleNewMessage = async (e: React.FormEvent, message: any) => {
    e.preventDefault()
    try {
      socket?.emit(SEND_MESSAGE_EVENT, {
        sendedBy: userState.id ? userState.id : id,
        recievedBy: params.id,
        message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { ownMessage: true, message },
      ]);

      await axios.post("http://localhost:8000/api/users/conversation", {
        sendedBy: userState.id ? userState.id : id,
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
          `http://localhost:8000/api/users/conversation?memberId1=${userState.id ? userState.id : id}&memberId2=${params.id}`
        
        );
        setMessages(data);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    initialConversation();
  }, [userState.id, params.id, id]);

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
      sendedBy: userState.id ? userState.id : id,
      recievedBy: params.id,
    });
    return () => {
      socket?.emit(CLEAN_EVENT, {
        sendedBy: userState.id ? userState.id : id,
        recievedBy: params.id,
      });
    
    };
  }, [userState.id, params.id, socket, id]);

  useEffect(() => {
    if (incomingMessage ) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage, params.id, userState.activeChatId]);

  useEffect(() => {
    const handleIncomingMessage = (data: { message: string, sendedBy:string}) => {

      console.log(userState.activeChatId)
      console.log(data);
      if(userState.activeChatId === data.sendedBy){
        setIncomingMessage({
          ownMessage: false,
          message: data.message,
        });
      }
     
    };

    socket?.on(INCOMING_MESSAGE_EVENT, handleIncomingMessage);

    return () => {
      socket?.off(INCOMING_MESSAGE_EVENT, handleIncomingMessage);
    };
  }, [socket, userState.activeChatId]);

  return {
     messages,
     handleNewMessage,
     setNewMessage,
     newMessage
     
  }
}