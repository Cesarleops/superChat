import ToogleSwitch from "@/components/molecules/ToogleSwitch";
import { UserMenu } from "@/components/molecules/UserMenu";
import { ChatsSection } from "@/components/molecules/ChatsSection";
import { HomeHeader } from "@/components/molecules/HomeHeader";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function Home({ params }: Params) {
  return (
    <main className="h-screen">
      <UserMenu />
      <section className="flex flex-col h-full bg-cyan-400">
        <HomeHeader />
        <section className="flex flex-col gap-8 flex-grow pt-6 px-2 rounded-t-3xl bg-white">
          <hgroup>
            <h5 className="text-lg text-emerald-500">Talk with talkie</h5>
            <h1 className="text-4xl">Chat Room</h1>
          </hgroup>
          <ChatsSection />
        </section>
      </section>
      <section className="absolute h-14 w-48 bg-black flex flex-col items-center justify-center  translate-x-2/4  bottom-6 rounded-3xl">
        <ToogleSwitch />
      </section>
    </main>
  );
}
