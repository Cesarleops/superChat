import Link from "next/link";
import { RiKakaoTalkFill } from "react-icons/ri";
interface Props {
  profilePic?: string;
  name?: string;
  id?: string;
  params?: string;
}
const FriendCard = ({ profilePic, name, id, params }: Props) => {
  return (
    <main className="flex gap-2 w-32 h-20 bg-terciary rounded-3xl relative p-2">
      <figure>Circle</figure>
      <article className="flex flex-col gap-3">
        <h5 className="font-medium text-lg">{name}</h5>
        <Link href={`/home/${params}/${id}`}>
          <RiKakaoTalkFill className="font-bold text-2xl text-secondary" />
        </Link>
      </article>
    </main>
  );
};

export default FriendCard;
