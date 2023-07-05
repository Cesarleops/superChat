import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
type Props = {
  children: React.ReactNode;
  params: Params;
};

const getUser = async (id: any) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/users/obtain/${id}`
  );
  console.log("no se que es", data);
  return data;
};
const ChatLayout = async ({ children, params }: Props) => {
  console.log(params);
  const chatUser = await getUser(params.id);
  const name =
    chatUser.userName.slice(0, 1).toUpperCase() + chatUser.userName.slice(1);
  return (
    <section className=" h-screen relative">
      <header className="fixed w-screen flex h-12 bg-primary items-center pl-4 justify-start gap-4">
        <Link href={`/home/${params.user}`}>
          <BiLeftArrowAlt className="w-8 h-1/2 text-secondary" />
        </Link>

        <figure>Foto</figure>
        <p className="text-secondary">{name}</p>
      </header>
      {children}
    </section>
  );
};

export default ChatLayout;
