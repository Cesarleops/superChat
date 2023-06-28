"use client";
import { useUserContext } from "@/context/store";
import { useEffect } from "react";

export const SocketConnection = () => {
  const { userState, socket } = useUserContext();
  const id = localStorage.getItem("iden");
  useEffect(() => {
    socket?.emit("loged", {
      sendedBy: userState.id ? userState.id : id,
    });
  }, [userState.id, id, socket]);

  return <></>;
};
