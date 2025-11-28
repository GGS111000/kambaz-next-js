/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ReactNode, ComponentType } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import KambazNavigation from "./Navigation";

const ReduxProvider = Provider as ComponentType<any>;

export default function KambazLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <div className="d-flex">
        <KambazNavigation />
        <div className="flex-grow-1 ms-4">{children}</div>
      </div>
    </ReduxProvider>
  );
}
