"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div className="d-flex">
        <aside
          id="wd-nav1"
          className="bg-black"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            minHeight: "100vh",
            width: 260, // ← 想右移多少，就把这里和下面 padding 协调起来
          }}
        >
          <KambazNavigation />
        </aside>

        {/* 在这里右移一点 */}
        <main id="wd-content" className="flex-fill" style={{ minWidth: 0, paddingLeft: 16 }}>
          {children}
        </main>
      </div>
    </Provider>
  );
}
