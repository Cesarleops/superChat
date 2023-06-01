"use client";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import ChatCard from "@/components/molecules/ChatCard";
import FriendCard from "@/components/molecules/FriendCard";
import Image from "next/image";
import { useUserContext } from "@/context/store";

export default function Home() {
  const { userState } = useUserContext();

  return (
    <main className="h-screen">
      <section className="flex flex-col h-full bg-cyan-400">
        <section className="flex flex-col h-52  p-3">
          <h1 className="text-4xl font-bold text-white mb-6 mt-6">
            My Friends
          </h1>
          <section className="flex gap-5 pl-2 pb-3">
            <FriendCard name="cesar" />
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

      <div className="absolute h-14 w-48 bg-black flex flex-col items-center justify-center  translate-x-2/4  bottom-6 rounded-3xl">
        <label
          htmlFor="toggle"
          className="bg-black relative w-4/5 h-4/5 rounded-full cursor-pointer"
        >
          <input type="checkbox" id="toggle" className="sr-only peer" />
          <BiHomeAlt
            className="absolute text-3xl left-2 w-12 h-9/12  text-black z-10 transition-all duration-500  
          top-2 peer-checked:text-white transition-all duration-500"
          />
          <CgProfile
            className="absolute text-3xl right-1 w-12 h-9/12 text-white transition-all duration-500 
          top-2 peer-checked:text-black z-10 transition-all duration-500  "
          />
          <span
            className="w-2/5 h-5/6 bg-white absolute rounded-full left-1 top-1 
           peer-checked:left-24 transition-all duration-500"
          ></span>
        </label>
      </div>
    </main>
  );
}
