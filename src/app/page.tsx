"use client";
import InputComponent from "@/components/atoms/InputComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <main className="w-screen h-screen  flex flex-col items-center gap-8">
      <hgroup className="pt-44 ">
        <h1 className="text-3xl">Welcome Back</h1>
        <h6 className="text-lg">Login to your account</h6>
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
          className="w-3/5 h-12 bg-green-600 text-white rounded-full"
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
