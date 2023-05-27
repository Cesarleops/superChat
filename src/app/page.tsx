import ChatCard from "@/components/molecules/ChatCard";
import FriendCard from "@/components/molecules/FriendCard";
import Image from "next/image";

export default function Home() {
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
          <ChatCard />
        </section>
      </section>

      <div className="absolute left-40 bottom-2">Menu</div>
    </main>
  );
}
