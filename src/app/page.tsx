"use client";
import InputComponent from "@/components/atoms/InputComponent";
import { useUserContext } from "@/context/store";
import useForm from "@/hooks/useForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialForm = {
  email: "",
  password: "",
};
const Login = () => {
  const { login, userState } = useUserContext();
  const { form, handleChange } = useForm(initialForm);
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    login(form);
  };
  const router = useRouter();
  useEffect(() => {
    if (userState.loged === "authenticated") {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, [userState.loged, router]);
  return (
    <main className="w-screen h-screen bg-white flex flex-col items-center gap-8">
      <hgroup className="pt-44 flex flex-col items-center ">
        <h1 className="text-3xl text-sky-600">Welcome Back</h1>
        <h6 className="text-lg text-sky-600">Login to your account</h6>
      </hgroup>

      <section className="flex flex-col gap-4">
        <form>
          <InputComponent
            type="text"
            onChange={handleChange}
            name="email"
            text="Email"
          />
          <InputComponent
            type="password"
            onChange={handleChange}
            name="password"
            text="Password"
          />
        </form>

        <article className="flex gap-4">
          <article>
            <label htmlFor="remember">Remember me </label>
            <input id="remember" type="checkbox" />
          </article>
          <p>Forgot Password ?</p>
        </article>
      </section>
      <section className="w-3/5  flex flex-col items-center">
        <button
          className="w-3/5 h-12 bg-gradient-to-r from-blue-800 to-sky-500 text-white rounded-full"
          onClick={handleSubmit}
        >
          Continue
        </button>
        <p>
          Already have an account? <Link href={"/signUp"}>Sign Up</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
