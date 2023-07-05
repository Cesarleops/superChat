import FriendCard from "./FriendCard";

interface Props {
  data: [];
  params: string;
}

interface User {
  userName: string;
  id: string;
  key: string;
}
export const FriendList = ({ data, params }: Props) => {
  return (
    <section className="flex gap-3 overflow-x-auto w-[300px]">
      {data.map((user: User) => (
        <FriendCard
          key={user.id}
          name={user.userName}
          id={user.id}
          params={params}
        />
      ))}
    </section>
  );
};
