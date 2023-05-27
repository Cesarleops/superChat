import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const ChatScreen = ({ params }: Params) => {
  const { id } = params;
  return (
    <main className="flex flex-col h-screen">
      <header className="h-12 bg-emerald-200">
        <figure></figure>
        <p>{id}</p>
      </header>
      <section className="h-4/5">aca van los mensajes</section>
      <section className="flex flex-grow items-end bg-red-500 p-5">
        <input className="h-10" type="text" placeholder="Text sum" />
        <figure>Icono </figure>
      </section>
    </main>
  );
};

export default ChatScreen;
