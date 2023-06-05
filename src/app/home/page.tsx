"use client";
import { AiOutlineSearch } from "react-icons/ai";
import ChatCard from "@/components/molecules/ChatCard";
import FriendCard from "@/components/molecules/FriendCard";
import { useUserContext } from "@/context/store";
import { useState } from "react";
import ToogleSwitch from "@/components/molecules/ToogleSwitch";

export default function Home() {
  const { userState } = useUserContext();
  const [showingSearch, setShowingSearch] = useState(false);
  return (
    <main className="h-screen">
      <section className="flex flex-col h-full bg-cyan-400">
        <section className="flex flex-col h-52  p-3">
          <h1 className="text-4xl font-bold text-white mb-6 mt-6">
            My Friends
          </h1>
          <section className="flex gap-5 pl-2 pb-3">
            <FriendCard name="cesar" />
            <AiOutlineSearch />
          </section>
        </section>
        <section className="flex flex-col gap-8 flex-grow pt-6 px-2 rounded-t-3xl bg-white">
          <hgroup>
            <h5 className="text-lg text-emerald-500">Talk with talkie</h5>
            <h1 className="text-4xl">Chat Room</h1>
          </hgroup>
          <ChatCard name="cesar" />
        </section>
      </section>
      <section className="absolute h-14 w-48 bg-black flex flex-col items-center justify-center  translate-x-2/4  bottom-6 rounded-3xl">
        <ToogleSwitch />
      </section>
    </main>
  );
}
