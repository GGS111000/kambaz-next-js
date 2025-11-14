"use client";

import { Provider } from "react-redux";
import store from "./store";
import Session from "./Account/Session";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ children }) {
  return (
    <Provider store={store}>
      <Session>
        <div className="d-flex">
          <KambazNavigation />
          <div className="flex-grow-1 ms-4">{children}</div>
        </div>
      </Session>
    </Provider>
  );
}
