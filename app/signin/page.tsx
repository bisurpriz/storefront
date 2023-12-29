"use client";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      console.log(result);
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
      } else {
        /*Investigate why the login hasn't completed */
        router.push("/signup");
        console.log(result);
      }
    } catch (err: any) {
      router.push("/signup");
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
