"use client";
import InputComponent from "@/components/atoms/InputComponent";
import { useUserContext } from "@/context/store";
import useForm from "@/hooks/useForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialForm = {
  email: "",
  password: "",
};
const Login = () => {
  const { userState } = useUserContext();
  const { handleChange, handleSubmit, errors } = useForm(initialForm);
  const router = useRouter();
  useEffect(() => {
    if (userState.loged === "authenticated") {
      router.push(`/home/${userState.userName}`);
    } else {
      router.push("/");
    }
  }, [userState.loged, router, userState.userName]);
  return (
    <main className="w-screen h-screen bg-white flex flex-col items-center gap-8">
      <hgroup className="pt-44 flex flex-col items-center ">
        <h1 className="text-3xl text-terciary font-bold ">Welcome Back</h1>
        <h6 className="text-lg text-terciary font-medium">
          Login to your account
        </h6>
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
          {errors.login && (
            <p className="text-red-600 text-center mt-3">{errors.login}</p>
          )}
          <article className="flex gap-4 mt-5">
            <article>
              <label htmlFor="remember" className="font-normal">
                Remember me{" "}
              </label>
              <input id="remember" type="checkbox" />
            </article>
            <p className="font-normal">Forgot Password ?</p>
          </article>
          <section className="flex flex-col items-center mt-5">
            <button
              type="submit"
              className="w-3/5 h-12 bg-gradient-to-r from-primary to-terciary text-white rounded-full font-semibold mb-4"
              onClick={(e) => handleSubmit(e, "login")}
            >
              Continue
            </button>
            <p className="font-normal">
              Already have an account?{" "}
              <Link href={"/signUp"} className="text-terciary">
                Sign Up
              </Link>
            </p>
          </section>
        </form>
      </section>
    </main>
  );
};

export default Login;
