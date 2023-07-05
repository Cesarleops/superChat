"use client";
import SignOutButton from "../atoms/signOutButton";
import { useUserContext } from "@/context/store";
import { useRouter } from "next/navigation";

interface Props {
  userName: string;
}
export const UserMenu = ({ userName }: Props) => {
  const { userState, setMenu } = useUserContext();
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
          <section className="flex gap-5 w-full h-11 items-center justify-start">
            <figure className="h-20 w-20 flex items-center justify-center bg-secondary rounded-full">
              foto
            </figure>
            <p className="text-3xl text-secondary">{userName}</p>
          </section>
          <section className="flex flex-col justify-start items-start ">
            <article className="bg-secondary mt-10 mb-5 rounded-xl">
              <button
                className="p-1 m-0  text-terciary text-lg"
                onClick={() => {
                  setMenu();
                  router.push(`home/${userName}/requests`);
                }}
              >
                Frienquests
              </button>
            </article>
            <SignOutButton />
          </section>
        </section>
      ) : null}
    </main>
  );
};
