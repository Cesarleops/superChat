import { useUserContext } from "@/context/store";
import { useState } from "react";

interface Props {
  id: string;
  userName: string;
}

export const SendFriendRequest = ({ id, userName }: Props) => {
  const [sended, setSended] = useState(false);
  const { socket, userState } = useUserContext();
  return (
    <article className="flex items-center gap-10">
      <p className="text-2xl text-secondary mr-auto">{userName}</p>
      <button
        disabled={sended}
        className="bg-terciary text-base text-center text-secondary p-2 rounded-xl"
        onClick={() => {
          socket?.emit("addFriend", {
            id: id,
            from: userState.id,
          });
          setSended(true);
        }}
      >
        {sended ? "Sended" : "Send"}
      </button>
    </article>
  );
};
