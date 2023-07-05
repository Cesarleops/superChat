"use client";
import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai";

import { useState } from "react";
interface Props {
  type: "text" | "password" | "email";
  text: string;
  large?: boolean;
  name: string;
  onChange?: (e: any) => void;
  onBlur?: (name: string) => void;
}

const InputComponent = ({
  type,
  text,
  large,
  onChange,
  name,
  onBlur,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const Icon = () => {
    if (type === "password") {
      return <BsLockFill />;
    } else if (type === "email") {
      return <AiTwotoneMail />;
    } else {
      return <BsFillPersonFill />;
    }
  };

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section
      className={`relative w-${
        large ? "20" : ""
      } p-3 border-2 shadow-lg bg-white flex items-center rounded-full gap-4 mt-8 hover:border-terciary`}
    >
      <Icon />
      {isVisible ? (
        <input
          type="text"
          id={text}
          placeholder={text}
          name={name}
          onChange={onChange}
          onBlur={() => (onBlur ? onBlur(name) : null)}
        />
      ) : (
        <input
          type={type}
          id={text}
          placeholder={text}
          name={name}
          onChange={onChange}
          onBlur={() => (onBlur ? onBlur(name) : null)}
        />
      )}
      {type === "password" &&
        (isVisible ? (
          <AiFillEyeInvisible onClick={handleVisibilityToggle} />
        ) : (
          <AiFillEye onClick={handleVisibilityToggle} />
        ))}
    </section>
  );
};

export default InputComponent;
