/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { FormControl } from "react-bootstrap";
import Link from "next/link";

import * as client from "../client";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Account/Profile");
  };

  return (
    <div className="container mt-3">
      <h1>Sign in</h1>
      <FormControl
        placeholder="username"
        className="mb-2"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="btn btn-primary w-100 mb-2" onClick={signin}>
        Sign in
      </button>
      <Link href="/Account/Signup">Sign up</Link>
    </div>
  );
}
