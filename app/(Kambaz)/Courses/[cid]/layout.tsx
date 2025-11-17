"use client";

import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-fluid mt-2">
      <Breadcrumb />

      <div className="row mt-2">
        {/* 第二列：红色课程菜单 */}
        <div
          className="col-2 pt-2"
          style={{ borderRight: "1px solid #ddd", minHeight: "100vh" }}
        >
          <Navigation />
        </div>

        {/* 第三列：课程内容区域 */}
        <div className="col-10 pt-2">{children}</div>
      </div>
    </div>
  );
}
