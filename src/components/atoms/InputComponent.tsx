import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
interface Props {
  type: "text" | "password";
  text?: string;
  large?: boolean;
}

const InputComponent = ({ type, text, large }: Props) => {
  return (
    <section
      className={`relative w-${
        large ? "20" : ""
      } bg-red-100 p-3 flex items-center rounded-full gap-4 mt-8`}
    >
      {type === "password" ? <BsLockFill /> : <BsFillPersonFill />}

      <input type={type} id={text} className="bg-transparent peer" />
      {type === "password" && <AiFillEye />}
      <label
        className="absolute top-3 left-12 text-base text-black 
        peer-focus:-top-7 transition-all duration-500 text-2xl text-green-500 "
        htmlFor={text}
      >
        {text}
      </label>
    </section>
  );
};

export default InputComponent;
