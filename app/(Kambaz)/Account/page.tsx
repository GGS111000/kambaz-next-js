/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";


export default function AccountPage() {
const currentUser = useSelector((s: any) => s?.accountReducer?.currentUser ?? null);
 if (!currentUser) {
   redirect("/Account/Signin");
 } else {
   redirect("/Account/Profile");
 }
}
