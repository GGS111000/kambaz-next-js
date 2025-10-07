import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import KambazNavigation from "../../Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb"; // ✅ 新增导入

export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="d-flex">
      {/* ✅ 左侧 Kambaz 全局导航 */}
      <KambazNavigation />

      {/* ✅ 右侧主区域 */}
      <div className="flex-fill" style={{ marginLeft: 120, padding: 20 }}>
        {/* ✅ 面包屑（替代原 h2 + hr） */}
        <Breadcrumb course={course} />

        <div className="d-flex">
          {/* ✅ 左侧课程导航 */}
          <CourseNavigation />

          {/* ✅ 右侧内容区 */}
          <div className="flex-fill" style={{ marginLeft: 150, padding: 20 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
