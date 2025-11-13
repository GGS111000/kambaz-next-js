"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/app/(Kambaz)/store";

// 关键：禁止该页面在构建期被静态预渲染
export const dynamic = "force-dynamic";

export default function AccountProfilePage() {
  // 选择器兜底，避免 undefined 解构崩溃
  const account = useSelector((s: RootState) => s.accountReducer ?? { currentUser: null });
  const { currentUser } = account as { currentUser: null | { name?: string; email?: string } };

  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      // 未登录就跳登录页（客户端执行，不参与预渲染）
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    // 构建期/客户端首次渲染时都先给个占位，避免报错
    return <div className="p-3">Redirecting to sign in…</div>;
  }

  return (
    <div className="p-3">
      <h2 className="mb-3">Profile</h2>
      <div className="mb-2"><strong>Name:</strong> {currentUser.name ?? "—"}</div>
      <div className="mb-2"><strong>Email:</strong> {currentUser.email ?? "—"}</div>
    </div>
  );
}
