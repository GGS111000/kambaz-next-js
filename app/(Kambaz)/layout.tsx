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
            width: 120, // narrower left nav per design request
          }}
        >
          <KambazNavigation />
        </aside>

        {/* main content — reduce left padding to match narrower nav */}
        <main id="wd-content" className="flex-fill" style={{ minWidth: 0, paddingLeft: 8 }}>
          {children}
        </main>
      </div>
    </Provider>
  );
}
