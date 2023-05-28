"use client";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";

const ChatScreen = ({ params }: Params) => {
  const { id } = params;
  const name = id.slice(0, 1).toUpperCase() + id.slice(1);
  const router = useRouter();
  return (
    <main className="flex flex-col h-screen">
      <header className="flex h-12 bg-emerald-200 items-center pl-4 justify-start gap-4">
        <BiLeftArrowAlt className="w-8 h-1/2" onClick={() => router.back()} />
        <figure>Foto</figure>
        <p>{name}</p>
      </header>
      <section className="h-4/5">aca van los mensajes</section>
      <section className="flex flex-grow items-center bg-red-500 p-5 gap-4">
        <input type="text" className="rounded-2xl w-4/5 h-9" />
        <MdSend className="h-8 w-8" />
      </section>
    </main>
  );
};

export default ChatScreen;
