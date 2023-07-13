"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/store";
import { BsDoorOpen } from "react-icons/bs";
const SignOutButton = () => {
  const { userState, socket, logout } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    if (socket?.connected) {
      socket?.emit("logout", userState.id);
    }
    await fetch("http://localhost:8000/api/users/logout", {
      method: "post",
      body: "",
      credentials: "include",
    });
    logout();
    router.push("/");
  };

  return (
    <article className="flex p-1 bg-terciary h-[40px] w-[40px] rounded-xl">
      <button onClick={handleLogout} className="text-lg text-red-500">
        <BsDoorOpen className="h-[30px] w-[30px]" />
      </button>
    </article>
  );
};

export default SignOutButton;
