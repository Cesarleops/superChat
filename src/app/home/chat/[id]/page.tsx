"use client";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/context/store";
const data = [
  {
    sended: true,
    text: "Hola que tal",
  },
  {
    sended: true,
    text: "Messi se va del barca",
  },
  {
    sended: false,
    text: "Mahrez se va del city",
  },
];
const socket = io("http://localhost:8000");
const ChatScreen = ({ params }: Params) => {
  const { id } = params;
  const { userState } = useUserContext();
  const [chatUser, setChatUser] = useState({});
  const [newMessage, setNewMessage] = useState("");
  console.log(newMessage);
  const name = id.slice(0, 1).toUpperCase() + id.slice(1);
  const router = useRouter();

  useEffect(() => {
    socket.on("incomingMessage", (m) => {
      console.log(m);
      setNewMessage(m);
    });
  }, [newMessage]);

  useEffect(() => {
    socket.emit("loged", userState.id);
  }, []);
  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/users/${id}`);
    console.log(data);
    setChatUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  const [input, setInput] = useState("");
  return (
    <main className="flex flex-col h-screen">
      <header className="flex h-12 bg-emerald-200 items-center pl-4 justify-start gap-4">
        <BiLeftArrowAlt className="w-8 h-1/2" onClick={() => router.back()} />
        <figure>Foto</figure>
        <p>{chatUser.userName}</p>
      </header>
      <section className="h-4/5 space-y-2 p-3 flex flex-col">
        {data.map((m) => (
          <div
            className={`bg-red-500 w-fit h-auto p-2 rounded-md ${
              m.sended ? "self-start" : "self-end"
            }`}
            key={Math.random()}
          >
            <p>{m.text}</p>
          </div>
        ))}
      </section>
      <section className="flex flex-grow items-center bg-red-500 p-5 gap-4">
        <input
          type="text"
          className="rounded-2xl w-4/5 h-9"
          onChange={(e) => setInput(e.target.value)}
        />
        <MdSend
          className="h-8 w-8"
          onClick={() => {
            console.log("enviar mensaje");
            socket.emit("sendingMessage", { input, id });
          }}
        />
      </section>
    </main>
  );
};

export default ChatScreen;
