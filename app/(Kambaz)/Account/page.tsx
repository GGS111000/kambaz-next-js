<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Account/page.tsx
"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  return currentUser ? redirect("/Account/Profile") : redirect("/Account/Signin");
=======
import { redirect } from "next/dist/client/components/navigation";


export default function AccountPage() {
 redirect("/Account/Signin");
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
}
