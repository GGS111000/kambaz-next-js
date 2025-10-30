"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div className="d-flex">
        <KambazNavigation />             {/* 左1黑栏 */}
        <div className="flex-grow-1 ms-4">{children}</div>
      </div>
    </Provider>
  );
}
