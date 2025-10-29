/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // 必须：使用 React Hook（Hook=React Hook）

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  // ① 兼容不同的 reducer 键名（account 或 accountReducer）
  // ② 避免对 undefined 直接解构
  const accountSlice =
    useSelector((state: any) => state.account) ??
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSelector((state: any) => state.accountReducer) ??
    {};

  const currentUser = accountSlice?.currentUser ?? null;

  // 不能在客户端组件里用 server 的 redirect（Redirect=重定向）
  if (!currentUser) {
    router.replace("/Account/Signin");
    return null; // 防止闪烁
  }

  return (
    <div className="p-3">
      <h2>Account</h2>
      <div>Welcome, {currentUser?.username}</div>
    </div>
  );
}
