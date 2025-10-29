"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
  <Provider store={store}>
  <div className="d-flex">
    <div>
      <KambazNavigation />
       {children}
    </div>
  
</div>
</Provider>
);}


