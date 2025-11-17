"use client";

import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <div className="row">

          {/* 左黑侧栏 Navigation */}
          <div
            className="col-1 p-0"
            style={{ backgroundColor: "black", minHeight: "100vh" }}
            suppressHydrationWarning
          >
            <KambazNavigation />
          </div>

          {/* 主内容 */}
          <div className="col-11 p-4">{children}</div>

        </div>
      </div>
    </Provider>
  );
}
