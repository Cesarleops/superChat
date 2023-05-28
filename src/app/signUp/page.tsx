import InputComponent from "@/components/atoms/InputComponent";

const SignUp = () => {
  return (
    <main className="w-screen h-screen  flex flex-col items-center  pt-44">
      <hgroup className="flex flex-col items-center">
        <h1>Register</h1>
        <h5>Create your new account</h5>
      </hgroup>
      <section className="flex flex-col">
        <InputComponent type="text" text="Username" />
        <InputComponent type="text" text="Your Email" />
        <InputComponent type="password" text="Your password" />
      </section>
      <section>
        <button className="w-3/5 h-12 bg-green-600 text-white rounded-full">
          Continue
        </button>
        <p>Or continue with</p>
      </section>
    </main>
  );
};

export default SignUp;
