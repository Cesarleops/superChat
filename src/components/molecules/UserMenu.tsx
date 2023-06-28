"use client";
import { BsDoorOpen } from "react-icons/bs";
import { useUserContext } from "@/context/store";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const { userState, socket, logout } = useUserContext();
  const router = useRouter();
  return (
    <main
      className={`absolute top-0 w-screen bg-primary  ${
        userState.userMenu
          ? "h-4/5 transition-all z-50 duration-1000  rounded-b-2xl shadow-md"
          : "h-20 transition-all z-30 duration-1000"
      }`}
    >
      {userState.userMenu ? (
        <section className="w-screen h-full p-10 transition-all duration-100">
          <section className="flex gap-5 w-full h-11 items-center">
            <figure className="h-20 w-20 flex items-center justify-center bg-blue-700 rounded-full">
              foto
            </figure>
            <p>{userState.userName || "nombre"} </p>
          </section>
          <section className="flex gap-3 pt-10 items-center ">
            <BsDoorOpen className="h-8 w-8 text-red-700" />
            <p
              onClick={() => {
                socket?.emit("logout", userState.id);
                logout();
                router.push("/");
                socket?.disconnect();
              }}
              className="text-lg"
            >
              Sign out
            </p>
          </section>
        </section>
      ) : null}
    </main>
  );
};
