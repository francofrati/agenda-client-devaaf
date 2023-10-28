"use client";
import { AuthContext } from "@/contexts/authentication/authenticationProvider";
import { signInWithEmail } from "@/lib/authentication/auth";
import { redirect } from "next/navigation";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
  useContext,
} from "react";

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user } = useContext(AuthContext);

  const setValues = (
    setState: Dispatch<SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signInWithEmail(email, password);
    },
    [email, password]
  );
  if (user) return redirect("/businesses");
  return (
    <main>
      <form
        className="flex flex-col gap-5 w-[300px] p-4 rounded-sm mx-auto my-10 border-2"
        onSubmit={handleLogin}
      >
        <fieldset className="flex flex-col gap-3">
          <label htmlFor="" className="flex flex-col">
            Email
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setValues(setEmail, value);
              }}
              className="px-3 py-1 text-black border rounded-sm"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Password
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-3 py-1 text-black border rounded-sm"
              onChange={(e) => {
                const { value } = e.target;
                setValues(setPassword, value);
              }}
            />
          </label>
        </fieldset>
        <button type="submit" className="bg-white text-black rounded-sm border py-2 hover:bg-slate-200">
          Login
        </button>
      </form>
    </main>
  );
}

export default Page;
