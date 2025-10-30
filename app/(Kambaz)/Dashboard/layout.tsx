"use client";

import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col">
          {children}
        </div>
      </div>
    </div>
  );
}
