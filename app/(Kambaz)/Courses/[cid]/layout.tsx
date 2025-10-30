"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex">
      <CourseNavigation />           {/* 左2：课程导航 */}
      <div className="flex-fill p-4">{children}</div> {/* 主内容 */}
    </div>
  );
}
