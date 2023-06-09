import Link from "next/link";

interface Props {
  profilePic?: string;
  name?: string;
  id?: string;
}
const FriendCard = ({ profilePic, name, id }: Props) => {
  console.log(id);
  return (
    <main className="flex gap-2 w-32 h-20 bg-emerald-500 rounded-3xl relative p-2">
      <figure>Circle</figure>
      <article className="flex flex-col gap-3">
        <h5>{name}</h5>
        <Link href={`/home/chat/${id}`}>Talk</Link>
      </article>
    </main>
  );
};

export default FriendCard;
