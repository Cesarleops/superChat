import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import Image from "next/image";
import { BiLeftArrowAlt } from "react-icons/bi";
type Props = {
  children: React.ReactNode;
  params: Params;
};

const getUser = async (id: any) => {
  const { data } = await axios.get(
    `https://mychat-back.onrender.com/api/users/obtain/${id}`
  );

  return data;
};
const ChatLayout = async ({ children, params }: Props) => {
  const chatUser = await getUser(params.id);

  const name =
    chatUser.userName.slice(0, 1).toUpperCase() + chatUser.userName.slice(1);
  return (
    <section className=" h-screen relative">
      <header className="fixed w-screen flex h-12 bg-secondary text-white items-center pl-4 justify-start gap-4">
        <Link href={`/home/${params.user}`}>
          <BiLeftArrowAlt className="w-8 h-1/2 text-whitw" />
        </Link>

        <picture className="bg-white rounded-full h-30 w-30 text-center align-middle">
          {chatUser.profilePic && chatUser.profilePic.length > 0 && (
            <Image
              src={chatUser.profilePic}
              alt="profilePic"
              className="rounded-full"
              width={30}
              height={30}
              placeholder="blur"
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkZmCoBwAAlQCEgm+gqwAAAABJRU5ErkJggg=="
            />
          )}
        </picture>
        <p className="text-white">{name}</p>
      </header>
      {children}
    </section>
  );
};

export default ChatLayout;
