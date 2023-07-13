"use client";

import InputComponent from "@/components/atoms/InputComponent";
import { useUserContext } from "@/context/store";
import useForm from "@/hooks/useForm";
import { SignUp } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialForm: SignUp = {
  userName: "",
  password: "",
  email: "",
};

const SignUp = () => {
  const { handleChange, form, errors, handleBlur } = useForm(initialForm);
  const { signUp, userState } = useUserContext();

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(form);
  };
  useEffect(() => {
    if (userState.loged === "authenticated") {
      router.push(`/home/${userState.userName}`);
    } else {
      router.push("/signUp");
    }
  }, [userState.loged, router, userState.userName]);
  return (
    <main className="w-screen h-screen bg-secondary flex flex-col items-center pt-44 ">
      <hgroup className="flex flex-col items-center">
        <h1 className="text-terciary text-3xl font-bold">Register</h1>
        <h5 className="text-terciary text-lg font-medium">
          Create your new account
        </h5>
      </hgroup>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <section className="flex flex-col ">
          <InputComponent
            type="text"
            text="Username"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.userName && (
            <p className="max-w-[200px] text-red-700 text-center">
              {errors.userName}
            </p>
          )}
          <InputComponent
            type="email"
            text="Your Email"
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
          />
          {errors.email && (
            <p className="max-w-[200px] text-red-700 text-center">
              {errors.email}
            </p>
          )}
          <InputComponent
            type="password"
            text="Your password"
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
          />
          {errors.password && (
            <p className="max-w-[200px] text-red-700 text-center">
              {errors.password}
            </p>
          )}
        </section>
        <section className="flex flex-col items-center  pt-5  w-4/5 gap-5">
          <button
            type="submit"
            className="w-4/5 h-12 font-semibold text-white rounded-full bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-terciary"
          >
            Continue
          </button>
          <p className="text-white">
            Already have an account ?{" "}
            <Link className="text-terciary" href={"/"}>
              Log in
            </Link>
          </p>
        </section>
      </form>
    </main>
  );
};

export default SignUp;
