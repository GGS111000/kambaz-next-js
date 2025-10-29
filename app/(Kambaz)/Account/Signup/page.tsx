import Link from "next/link";
<<<<<<< HEAD
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Signup</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
      /><br />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      /><br />

      <FormControl
        id="wd-email"
        placeholder="email"
        type="email"
        className="mb-2"
      /><br />

      <Link
        id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"   
      >
        Signup
      </Link><br />

      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
=======
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" className="wd-username" /><br/>
      <input placeholder="password" type="password" className="wd-password" /><br/>
      <input placeholder="verify password"
             type="password" className="wd-password-verify" /><br/>
      <Link  href="Profile" > Sign up </Link><br />
      <Link  href="Signin" > Sign in </Link>
    </div>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
