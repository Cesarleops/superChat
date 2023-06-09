"use client";
import InputComponent from "@/components/atoms/InputComponent";
import { useUserContext } from "@/context/store";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialForm = {
  userName: "",
  password: "",
  email: "",
};
const SignUp = () => {
  const { handleChange, form } = useForm(initialForm);
  const { signUp, userState } = useUserContext();

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("se envio");
    e.preventDefault();
    signUp(form);
  };
  useEffect(() => {
    if (userState.loged === "authenticated") {
      router.push("/home");
    } else {
      router.push("/signUp");
    }
  }, [userState.loged, router]);
  return (
    <main className="w-screen h-screen bg-white  flex flex-col items-center pt-44 ">
      <hgroup className="flex flex-col items-center">
        <h1 className="text-sky-600">Register</h1>
        <h5 className="text-sky-600">Create your new account</h5>
      </hgroup>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <section className="flex flex-col ">
          <InputComponent
            type="text"
            text="Username"
            name="userName"
            onChange={handleChange}
          />
          <InputComponent
            type="email"
            text="Your Email"
            onChange={handleChange}
            name="email"
          />
          <InputComponent
            type="password"
            text="Your password"
            onChange={handleChange}
            name="password"
          />
        </section>
        <section className="flex flex-col items-center  pt-5  w-4/5 gap-5">
          <button
            type="submit"
            className="w-4/5 h-12 text-white rounded-full bg-gradient-to-r from-blue-800 to-sky-500"
          >
            Continue
          </button>
          <p>Or continue with</p>
        </section>
      </form>
    </main>
  );
};

export default SignUp;
