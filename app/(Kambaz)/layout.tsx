"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";
import "./styles.css";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation />
        </div>
        {/* 给主区加点 padding，避免被左侧 Nav 遮住 */}
        <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
      </div>
    </Provider>
  );
}
