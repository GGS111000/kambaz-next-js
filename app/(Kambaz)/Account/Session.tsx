// app/(Kambaz)/Account/Session.tsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      }
    } catch (err) {
      // 没登录 / 401 之类，直接忽略
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    // 等待期间先不渲染子组件，避免闪一下未登录状态
    return null;
  }

  return <>{children}</>;
}
