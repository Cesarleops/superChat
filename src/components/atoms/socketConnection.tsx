"use client";
import { useUserContext } from "@/context/store";
import { useEffect } from "react";

export const SocketConnection = () => {
  const { userState, socket } = useUserContext();
  useEffect(() => {
    socket?.emit("loged", {
      sendedBy: userState.id,
    });
  }, [userState.id]);

  return <></>;
};
