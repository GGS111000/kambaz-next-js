/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { FormControl } from "react-bootstrap";
import Link from "next/link";

import * as client from "../client";
import { setCurrentUser } from "../reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  const signup = async () => {
    const newUser = await client.signup(user);
    dispatch(setCurrentUser(newUser));
    redirect("/Account/Profile");
  };

  return (
    <div className="container mt-3">
      <h1>Sign up</h1>

      <FormControl
        placeholder="username"
        className="mb-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <FormControl
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button className="btn btn-primary w-100 mb-2" onClick={signup}>
        Create account
      </button>

      <Link href="/Account/Signin">Already have an account?</Link>
    </div>
  );
}
