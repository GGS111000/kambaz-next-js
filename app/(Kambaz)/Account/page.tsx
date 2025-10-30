"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/app/(Kambaz)/store";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  const account = useSelector((s: RootState) => s.accountReducer ?? { currentUser: null });
  const { currentUser } = account as { currentUser: null | Record<string, unknown> };

  const router = useRouter();
  useEffect(() => {
    if (!currentUser) router.replace("/Account/Signin");
  }, [currentUser, router]);

  if (!currentUser) return <div className="p-3">Redirecting to sign in…</div>;

  return <div className="p-3">Welcome back!</div>;
}
