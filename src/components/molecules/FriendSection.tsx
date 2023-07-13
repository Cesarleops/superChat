import { ModalCard } from "./ModalCard";
import { FriendList } from "./FriendsList";

interface Props {
  user: string;
}

const fetchFriends = async (user: string) => {
  const data = await fetch(
    `https://mychat-back.onrender.com/api/users/friends/${user}`,
    {
      cache: "no-store",
    }
  );
  const res = await data.json();
  return res;
};
export const FriendsSection = async ({ user }: Props) => {
  const data = await fetchFriends(user);

  return (
    <main className="flex items-center gap-3  pl-2 pb-3 ">
      {data ? (
        <FriendList data={data} params={user} />
      ) : (
        <section className="flex items-center gap-5">
          <article className="flex gap-2 w-32 h-20 bg-terciary rounded-3xl items-center justify-center p-2">
            <p>Go find some friends </p>
          </article>
        </section>
      )}
      <ModalCard />
    </main>
  );
};
