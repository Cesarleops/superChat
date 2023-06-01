"use client";
import InputComponent from "@/components/atoms/InputComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <main className="w-screen h-screen bg-white flex flex-col items-center gap-8">
      <hgroup className="pt-44 flex flex-col items-center ">
        <h1 className="text-3xl text-sky-600">Welcome Back</h1>
        <h6 className="text-lg text-sky-600">Login to your account</h6>
      </hgroup>
      <section className="flex flex-col gap-4">
        <InputComponent type="text" text="Email" />
        <InputComponent type="password" text="Password" />
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
          onClick={() => router.push("/home")}
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
