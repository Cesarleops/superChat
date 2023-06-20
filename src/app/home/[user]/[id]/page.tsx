import { ChatBody } from "@/components/molecules/ChatBody";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const ChatScreen = async ({ params }: Params) => {
  return (
    <main className="flex flex-col h-5/6">
      <ChatBody />
    </main>
  );
};

export default ChatScreen;
