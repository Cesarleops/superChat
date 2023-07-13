"use client";
import { useUserContext } from "@/context/store";
import axios from "axios";
import { useState } from "react";
const AddFriend = ({ from, uid }: { from: string; uid: string }) => {
  const { userState } = useUserContext();
  const [sended, setSended] = useState(false);
  const acceptFriend = async (uid: string, username: string) => {
    setSended(true);
    await axios.post(
      `http://localhost:8000/api/users/friends/${
        userState.id
      }`,
      {
        uid,
        username,
      }
    );
  };
  return (
    <section className="flex items-center py-1 px-2 rounded-lg bg-secondary shadow-lg">
      <p className="mr-auto text-white font-medium text-lg">{from}</p>
      <button
        disabled={sended}
        className="bg-terciary text-base text-center p-2 rounded-xl text-secondary "
        onClick={() => acceptFriend(uid, from)}
      >
        {!sended ? "accept" : "accepted"}
      </button>
    </section>
  );
};

export default AddFriend;
