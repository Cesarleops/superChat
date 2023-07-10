"use client";
import SignOutButton from "../atoms/signOutButton";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
interface Props {
  userName: string;
}
export const UserMenu = ({ userName }: Props) => {
  const { userState, setMenu, setProfilePic } = useUserContext();
  const [image, setImage] = useState([]);
  console.log(userState.profilePic);
  const handleImage = (e: React.ChangeEvent) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const [photo, setPhoto] = useState(false);

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
          <section className="flex flex-col gap-3 w-full h-11 items-start justify-start">
            <aside className="flex items-center gap-4">
              {photo ? (
                <input type="file" onChange={handleImage} />
              ) : (
                <picture className="bg-white rounded-full h-10 w-10 text-center align-middle">
                  {userState.profilePic.length > 0 ? (
                    <Image
                      src={userState.profilePic}
                      alt="profilePic"
                      className="rounded-full"
                      width={100}
                      height={40}
                    />
                  ) : (
                    <p>Foto</p>
                  )}
                </picture>
              )}
              <p className="text-3xl text-secondary">{userName}</p>
            </aside>
            <p
              onClick={async () => {
                if (typeof image === "string") {
                  const { data } = await axios.put(
                    `http://localhost:8000/api/users/${userState.id}`,
                    { image }
                  );
                  setProfilePic(data);
                }

                setPhoto(!photo);
              }}
            >
              Editar
            </p>
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
