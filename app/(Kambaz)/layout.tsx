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
      <KambazNavigation />
      {children}
    </Provider>
  );
}
