import ChatCard from "./ChatCard";

type TChats = {
  id: string;
  members: string;
  messages: {
    sendedBy: string;
    recievedBy: string;
    message: string;
  };
  unreadMessages: number;
};

type User = {
  user: string;
};
const getChats = async (user: string) => {
  const chats = await fetch(
    `https://mychat-back.onrender.com/api/users/conversation/${user}`,
    { cache: "no-store" }
  );
  const chats2 = await chats.json();

  return chats2;
};

export const ChatsSection = async ({ user }: User) => {
  const chats = await getChats(user);

  return (
    <main>
      <section className="flex flex-col gap-4">
        {chats.length > 0 ? (
          chats.map((chat: TChats) => (
            <ChatCard
              key={chat.id}
              name={chat.members}
              message={chat.messages}
              notifications={chat.unreadMessages}
              currentUser={user}
            />
          ))
        ) : (
          <p className="flex justify-center items-center">Talk to someone!</p>
        )}
      </section>
    </main>
  );
};
