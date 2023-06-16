import FriendCard from "./FriendCard";

export const FriendList = ({ data }) => {
  return data.map((user) => (
    <FriendCard key={user.id} name={user.username} id={user.id} />
  ));
};
