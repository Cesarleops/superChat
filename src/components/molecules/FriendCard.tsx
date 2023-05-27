import Link from "next/link";

interface Props {
  profilePic?: string;
  name?: string;
}
const FriendCard = ({ profilePic, name }: Props) => {
  return (
    <main className="flex gap-2 w-32 h-20 bg-emerald-500 rounded-3xl relative p-2">
      <figure>Circle</figure>
      <article className="flex flex-col gap-3">
        <h5>Suyeon</h5>
        <Link href={`/chat/${name}`}>Talk</Link>
      </article>
    </main>
  );
};

export default FriendCard;
