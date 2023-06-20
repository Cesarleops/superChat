import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { BiLeftArrowAlt } from "react-icons/bi";
type Props = {
  children: React.ReactNode;
  params: Params;
};

const getUser = async (id: any) => {
  console.log("hizo la peticion");
  console.log("id", id);
  const { data } = await axios.get(
    `http://localhost:8000/api/users/obtain/${id}`
  );
  console.log(data);
  return data;
};
const ChatLayout = async ({ children, params }: Props) => {
  console.log("esto aparecio");
  console.log("las params", params.id);
  const chatUser = await getUser(params.id);
  const name =
    chatUser.userName.slice(0, 1).toUpperCase() + chatUser.userName.slice(1);
  return (
    <section className=" h-screen relative">
      <header className="flex h-12 bg-blue-400 items-center pl-4 justify-start gap-4">
        <BiLeftArrowAlt className="w-8 h-1/2" />
        <figure>Foto</figure>
        <p>{name}</p>
      </header>
      {children}
    </section>
  );
};

export default ChatLayout;
