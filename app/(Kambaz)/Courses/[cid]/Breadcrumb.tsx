"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course?: { name: string } }) {
  const pathname = usePathname();
  const section = pathname.split("/").pop(); 

  return (
    <div
className="fs-5 text-danger border-bottom mb-3"
style={{ paddingBottom: "4px" }}
    >
      <i className="me-2 fa fa-bars text-danger"></i>
      <span className="fw-bold">{course?.name}</span>
      <span className="text-danger"> &gt; {section}</span>
    </div>
  );
}
