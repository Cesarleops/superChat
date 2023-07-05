import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import AddFriend from "@/components/atoms/AddFriend";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
const getRequests = async (user: string) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/users/friends/requests/${user}`
  );

  return data;
};
const FriendRequest = async ({ params }: Params) => {
  const data = await getRequests(params.user);
  return (
    <main className="h-screen w-screen ">
      <header className="flex justify-start items-center h-10 bg-terciary pl-2 gap-20">
        <Link href={`home/${params.user}`}>
          <BiLeftArrowAlt className="h-[30px] w-[30px] text-secondary text-3xl" />
        </Link>
        <h3 className="text-secondary text-xl font-bold">Friend Requests</h3>
      </header>
      <section className="px-4 mt-3  flex flex-col gap-4 justify-center">
        {data.map((e: { from: string; id: string }) => (
          <AddFriend key={e.id} from={e.from} uid={e.id} />
        ))}
      </section>
    </main>
  );
};

export default FriendRequest;
