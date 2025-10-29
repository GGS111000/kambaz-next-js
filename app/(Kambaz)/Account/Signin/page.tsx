<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from "next/link";
// import { FormControl } from "react-bootstrap";
// export default function Signin() {
//   return (
//     <div id="wd-signin-screen">
//       <h1>Signin</h1>
//       <FormControl id="wd-username"
//              placeholder="username"
//              className="mb-2"/>
//       <FormControl id="wd-password"
//              placeholder="password" type="password"
//              className="mb-2"/>
//       <Link id="wd-signin-btn"
//             href="/Account/Profile"
//             className="btn btn-primary w-100 mb-2">
//             Signin </Link>
//       <Link id="wd-signup-link" href="/Account/Signup">Signup</Link>
//     </div> );}

"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username && u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Kambaz/Account/Signup">
        {" "}
        Sign up{" "}
      </Link>
    </div>
  );
}
=======
import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" className="wd-username" /> <br />
     <input placeholder="password" type="password" className="wd-password" /> <br />
     <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="Signup" id="wd-signup-link"> Sign up </Link> <br />

     <Link href="../Labs/Lab1" id="wd-labs-link"> Go to Lab Exercises </Link>
   </div>

   
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
