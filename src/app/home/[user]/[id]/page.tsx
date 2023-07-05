import { ChatBody } from "@/components/molecules/ChatBody";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const ChatScreen = ({ params }: Params) => {
  return (
    <main className="flex flex-col h-full">
      <ChatBody params={params} />
    </main>
  );
};

export default ChatScreen;
