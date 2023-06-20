import { FriendsSection } from "@/components/molecules/FriendSection";
import { SocketConnection } from "../atoms/socketConnection";

export const HomeHeader = () => {
  return (
    <header>
      <section className="flex flex-col h-52  p-3">
        <SocketConnection />
        <h1 className="text-4xl font-bold text-white mb-6 mt-6 z-40">
          My Friends
        </h1>
        <FriendsSection />
      </section>
    </header>
  );
};
