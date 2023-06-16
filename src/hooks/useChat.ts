import { useUserContext } from "@/context/store";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export interface messagesInterface {
    sendedBy: string;
    recievedBy: string;
    message: string;
    ownMessage?: boolean;
  }

export const useChat = (params: Params , socket: Socket) => {

    const [messages, setMessages] = useState<messagesInterface[]>([
        {
          message: "",
          recievedBy: "",
          sendedBy: "",
        },
      ]);
      const { userState } = useUserContext();
      const [newMessage, setNewMessage] = useState({});
      const userId = localStorage.getItem("iden");
      const handleNewMessage = async (message: any) => {

        try {
        //   await axios.post("http://localhost:8000/api/users/newmessage", {
        //     sendedBy: userState.id,
        //     recievedBy: params.id,
        //     text: message,
        //   });
          socket.emit("sendingMessage", {
            sendedBy: userState.id,
            recievedBy: params.id,
            message,
          });
          setMessages([...messages, { ownMessage: true, message }]);
          console.log("se agrego un mensaje");
        } catch (error) {
          console.log("esto salio mal", error);
        }
      };
    
      
      useEffect(() => {
        socket.on("incomingMessage", (m) => {
          console.log(m);
          setNewMessage({ ownMessage: false, m });
        });
      }, [newMessage, socket]);
    
      useEffect(() => {
        socket.emit("loged", userId);
      }, [socket, userId]);
      useEffect(() => {
        newMessage && setMessages((prevState) => [...prevState, newMessage]);
      }, [newMessage]);

      return {
        messages,
        handleNewMessage, 
        newMessage, 
        setNewMessage
      }
}