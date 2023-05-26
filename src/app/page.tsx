import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen">
      <section className="flex flex-col h-full bg-purple-300">
        <section className="flex flex-col h-52  p-3">
          <h1 className="text-3xl font-bold mb-6 mt-6">My Friends</h1>
          <div className="flex gap-5 pl-2 pb-3">
            <div className="flex gap-2 w-32 h-20 bg-red-100 rounded-3xl relative p-2">
              <div>Circle</div>
              <article className="flex flex-col gap-3">
                <h5>Suyeon</h5>
                <p>Talk</p>
              </article>
            </div>
            <div className="flex gap-2 w-32 h-20 bg-red-100 rounded-3xl relative p-2">
              <div>Circle</div>
              <article className="flex flex-col gap-3">
                <h5>Suyeon</h5>
                <p>Talk</p>
              </article>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-8 flex-grow pt-6 px-2 rounded-t-3xl bg-red-400">
          <h6 className="text-base">Talk with talkie</h6>
          <h1 className="text-3xl">Chat Room</h1>
          <div className="flex gap-4 h-18 bg-red-600 rounded-3xl relative p-4">
            <div>Icon</div>
            <article className="flex flex-col gap-2">
              <p>Name</p>
              <p>Last message</p>
            </article>
            <div className="absolute top-3 right-5">+10</div>
          </div>
          <div className="flex gap-4 h-18 bg-red-600 rounded-3xl relative p-4">
            <div>Icon</div>
            <article className="flex flex-col gap-2">
              <p>Name</p>
              <p>Last message</p>
            </article>
            <div className="absolute top-3 right-5">+10</div>
          </div>
          <div className="flex gap-4 h-18 bg-red-600 rounded-3xl relative p-4">
            <div>Icon</div>
            <article className="flex flex-col gap-2">
              <p>Name</p>
              <p>Last message</p>
            </article>
            <div className="absolute top-3 right-5">+10</div>
          </div>
        </div>
      </section>

      <div className="absolute left-40 bottom-2">Menu</div>
    </main>
  );
}
