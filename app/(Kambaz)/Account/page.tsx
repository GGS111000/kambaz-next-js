
import { redirect } from "next/navigation";
import React from "react";

export default function AccountPage() {
 
  redirect("/Account/Signin");

 
  return <div>Redirecting to Signin...</div>;
}
