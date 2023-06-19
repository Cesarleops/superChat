"use client";
import ChatCard from "@/components/molecules/ChatCard";
import ToogleSwitch from "@/components/molecules/ToogleSwitch";
import { FriendsSection } from "@/components/molecules/FriendSection";
import { useEffect, useState } from "react";
import { UserMenu } from "@/components/molecules/UserMenu";
import { useUserContext } from "@/context/store";
import { ChatsSection } from "@/components/molecules/ChatsSection";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000");
export default function Home() {
  // const [userMenu, setUserMenu] = useState(false);
  const { userState } = useUserContext();
  useEffect(() => {
    socket.emit("loged", {
      sendedBy: userState.id,
    });
  }, [userState.id]);

  return (
    <main className="h-screen">
      {/* <UserMenu active={userMenu} /> */}
      <section className="flex flex-col h-full bg-cyan-400">
        <section className="flex flex-col h-52  p-3">
          <h1 className="text-4xl font-bold text-white mb-6 mt-6 z-40">
            My Friends
          </h1>
          <FriendsSection />
        </section>
        <section className="flex flex-col gap-8 flex-grow pt-6 px-2 rounded-t-3xl bg-white">
          <hgroup>
            <h5 className="text-lg text-emerald-500">Talk with talkie</h5>
            <h1 className="text-4xl">Chat Room</h1>
          </hgroup>
          <ChatsSection />
        </section>
      </section>
      <section className="absolute h-14 w-48 bg-black flex flex-col items-center justify-center  translate-x-2/4  bottom-6 rounded-3xl">
        {/* <ToogleSwitch setUserMenu={setUserMenu} menuState={userMenu} /> */}
      </section>
    </main>
  );
}
