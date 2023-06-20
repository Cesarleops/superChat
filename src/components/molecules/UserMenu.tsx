"use client";

import { useUserContext } from "@/context/store";

export const UserMenu = () => {
  const { userState } = useUserContext();
  return (
    <main
      className={`absolute top-0 w-screen bg-red-700  ${
        userState.userMenu
          ? "h-4/5 transition-all z-50 duration-1000 bg-red-400 rounded-b-2xl shadow-md"
          : "h-20 transition-all z-30 duration-1000"
      }`}
    ></main>
  );
};
