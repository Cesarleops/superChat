"use client";
import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai";

import { useState } from "react";
interface Props {
  type: "text" | "password" | "email";
  text?: string;
  large?: boolean;
  name?: string;
  onChange?: (e) => void;
}

const InputComponent = ({ type, text, large, onChange, name }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <section
      className={`relative w-${
        large ? "20" : ""
      }  p-3 border-2 shadow-lg bg-white flex items-center rounded-full gap-4 mt-8 hover:border-sky-500`}
    >
      {type === "password" ? (
        <BsLockFill />
      ) : type === "email" ? (
        <AiTwotoneMail />
      ) : (
        <BsFillPersonFill />
      )}
      {isVisible ? (
        <input
          type="text"
          id={text}
          className="bg-transparent "
          placeholder={text}
          name={name}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={text}
          className="bg-transparent "
          placeholder={text}
          name={name}
          onChange={onChange}
        />
      )}
      {type === "password" &&
        (isVisible ? (
          <AiFillEyeInvisible onClick={() => setIsVisible(!isVisible)} />
        ) : (
          <AiFillEye onClick={() => setIsVisible(!isVisible)} />
        ))}
    </section>
  );
};

export default InputComponent;
