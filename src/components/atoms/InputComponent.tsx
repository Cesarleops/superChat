import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
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
      } bg-blue-700 p-3 flex items-center rounded-full gap-4`}
    >
      {type === "password" ? <BsLockFill /> : <BsFillPersonFill />}

      <input type={type} id={text} className="peer" />
      <label
        className="absolute top-3 left-12 peer-focus:top-0 transition-all duration-500 "
        htmlFor={text}
      >
        {text}
      </label>
    </section>
  );
};

export default InputComponent;
