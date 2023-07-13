"use client";
import SignOutButton from "../atoms/signOutButton";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useCloudinary } from "@/hooks/useCloudinary";
interface Props {
  userName: string;
}
export const UserMenu = ({ userName }: Props) => {
  const { userState, setMenu, setProfilePic } = useUserContext();
  const { handleImage, image } = useCloudinary();
  const handlePhoto = async () => {
    if (typeof image === "string") {
      const { data } = await axios.put(
        `http://localhost:8000/api/users/${userState.id}`,
        { image }
      );
      console.log("cambio de imagen", data);
      setProfilePic(data);
    }
    setPhoto(!photo);
  };
  const [photo, setPhoto] = useState(false);
  console.log("mi foto", userState.profilePic);
  const router = useRouter();
  return (
    <main
      className={`absolute top-0 w-screen bg-secondary  ${
        userState.userMenu
          ? "h-4/5 transition-all z-50 duration-1000  rounded-b-2xl shadow-md"
          : "h-20 transition-all z-30 duration-1000"
      }`}
    >
      {userState.userMenu ? (
        <section className="w-screen h-full p-10 transition-all duration-100 ">
          <section className="flex flex-col gap-3 w-full mb-[20px] h-11 items-start justify-start">
            <aside className="flex items-center flex-wrap gap-4 ">
              {photo ? (
                <input
                  type="file"
                  onChange={handleImage}
                  className="max-w-[350px]  text-white h-10 "
                />
              ) : (
                <picture className="bg-white rounded-full h-10 w-10 text-center align-middle">
                  {userState.profilePic && userState.profilePic.length > 0 && (
                    <Image
                      src={userState.profilePic}
                      alt="profilePic"
                      className="rounded-full"
                      width={100}
                      height={40}
                      placeholder="blur"
                      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkZmCoBwAAlQCEgm+gqwAAAABJRU5ErkJggg=="
                    />
                  )}
                </picture>
              )}
              <p className="text-3xl text-terciary ">{userName}</p>
              <SignOutButton />
            </aside>
          </section>

          <section className="flex justify-start  items-center ">
            <article className="flex flex-wrap mt-10 mb-5  gap-4">
              <button
                className="p-1 m-0 bg-white shadow-sm rounded-xl   text-secondary text-lg"
                onClick={() => {
                  setMenu();
                  router.push(`home/${userName}/requests`);
                }}
              >
                Friendship requests
              </button>
              <button
                className="bg-white p-2 shadow-sm text-secondary rounded-xl text-lg"
                onClick={handlePhoto}
              >
                {!photo ? "Edit" : "Save"}
              </button>
              <button className="bg-white shadow-sm text-secondary p-1 m-0 rounded-xl text-lg">
                Colors!
              </button>
            </article>
          </section>
        </section>
      ) : null}
    </main>
  );
};
