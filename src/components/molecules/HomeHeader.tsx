import { FriendsSection } from "@/components/molecules/FriendSection";

interface Props {
  user: string;
}

export const HomeHeader = ({ user }: Props) => {
  return (
    <header className="bg-primary">
      <section className="flex flex-col h-52  p-3">
        <h1 className="text-4xl font-bold text-secondary mb-6 mt-6 z-40">
          My Friends
        </h1>
        <FriendsSection user={user} />
      </section>
    </header>
  );
};
