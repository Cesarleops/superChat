import { ChatBody } from "@/components/molecules/ChatBody";

const ChatScreen = ({ params }: { params: { id: string; user: string } }) => {
  return (
    <main className="flex flex-col h-full">
      <ChatBody params={params} />
    </main>
  );
};

export default ChatScreen;
