/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Account/page.tsx
"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  return currentUser ? redirect("/Account/Profile") : redirect("/Account/Signin");
}
