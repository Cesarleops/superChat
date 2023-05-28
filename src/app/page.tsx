import InputComponent from "@/components/atoms/InputComponent";
import Link from "next/link";

const Login = () => {
  return (
    <main className="w-screen h-screen bg-red-700 flex flex-col items-center gap-8">
      <hgroup className="pt-44 ">
        <h1 className="text-3xl">Welcome Back</h1>
        <h6 className="text-lg">Login to your account</h6>
      </hgroup>
      <section className="flex flex-col gap-4">
        <InputComponent type="text" text="User Name" />
        <InputComponent type="password" />
        <article className="flex">
          <label htmlFor="remember">Remember me </label>
          <input id="remember" type="checkbox" />
          <p>Forgot Password ?</p>
        </article>
      </section>
      <section className="w-3/5 bg-gray-700 flex flex-col items-center">
        <button className="w-3/5 h-12 bg-green-600 text-white rounded-full">
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
