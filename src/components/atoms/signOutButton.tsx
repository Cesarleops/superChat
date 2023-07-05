"use client";
import { BsDoorOpen } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/store";

const SignOutButton = () => {
  const { userState, socket, logout } = useUserContext();
  const router = useRouter();
  const id = localStorage.getItem("iden");
  return (
    <article className="flex p-1 bg-secondary rounded-xl">
      <button
        onClick={() => {
          socket?.emit("logout", userState.id ? userState.id : id);
          logout();
          router.push("/");
          socket?.disconnect();
        }}
        className="text-lg text-terciary "
      >
        Sign out
      </button>
    </article>
  );
};

export default SignOutButton;
