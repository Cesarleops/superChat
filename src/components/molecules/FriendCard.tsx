import Link from "next/link";
import { MdOutlineChat } from "react-icons/md";
import Image from "next/image";
interface Props {
  profilePic?: string;
  name?: string;
  id?: string;
  params?: string;
}
const FriendCard = ({ profilePic, name, id, params }: Props) => {
  console.log("parece que esto es undefined", profilePic);
  return (
    <main className="flex gap-2 w-32 h-20 bg-terciary rounded-3xl relative p-2">
      <picture className="bg-white rounded-full h-10 w-10 text-center align-middle">
        {profilePic && profilePic.length > 0 && (
          <Image
            src={profilePic}
            alt="profilePic"
            className="rounded-full"
            width={100}
            height={40}
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkZmCoBwAAlQCEgm+gqwAAAABJRU5ErkJggg=="
          />
        )}
      </picture>
      <article className="flex flex-col gap-3 justify-center items-center">
        <h5 className="font-medium text-lg text-secondary">{name}</h5>
        <Link href={`/home/${params}/${id}`}>
          <MdOutlineChat className="h-[30px] w-[30px] text-secondary" />
        </Link>
      </article>
    </main>
  );
};

export default FriendCard;
