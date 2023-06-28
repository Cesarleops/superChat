import { useUserContext } from "@/context/store";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

interface Props {
  profilePic?: string;
  name?: string;
  id?: string;
  params?: Params;
}
const FriendCard = ({ profilePic, name, id, params }: Props) => {
  const { userState } = useUserContext();
  return (
    <main className="flex gap-2 w-32 h-20 bg-terciary rounded-3xl relative p-2">
      <figure>Circle</figure>
      <article className="flex flex-col gap-3">
        <h5>{name}</h5>
        <Link href={`/home/${userState.userName}/${id}`}>Talk</Link>
      </article>
    </main>
  );
};

export default FriendCard;
