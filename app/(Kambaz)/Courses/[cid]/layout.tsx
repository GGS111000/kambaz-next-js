// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/(Kambaz)/Courses/[cid]/layout.tsx
// "use client";
// import { ReactNode } from "react";
// import CourseNavigation from "./Navigation";
// import { useSelector } from "react-redux";
// import { useParams } from "next/navigation";

// export default function CoursesLayout({ children }: { children: ReactNode }) {
//   const { cid } = useParams();
//   const { courses } = useSelector((state: any) => state.coursesReducer);
//   const course = courses.find((course: any) => course._id === cid);

//   return (
//     <div style={{ marginLeft: 120 }}> {/* ← 就加这一行 marginLeft */}
//       <h2>
//         {course?.name}
//       </h2>
//       <hr />
//       <div className="d-flex">
//         <div><CourseNavigation params={{ cid: cid as string }} /></div>
//         <div className="flex-fill">{children}</div>
//       </div>
//     </div>
//   );
// }
'use client';

import { ReactNode, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaAlignJustify } from 'react-icons/fa6';
import CourseNavigation from './Navigation';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);

  const [showNav, setShowNav] = useState(true); // 控制是否显示子导航

  return (
    <div id="wd-courses" className="position-relative">
      {/* 顶部课程标题 & 三条线按钮 */}
      <div className="d-flex align-items-center justify-content-between">
        <h2>
          <FaAlignJustify
            className="me-4 fs-4 mb-1"
            role="button"
            onClick={() => setShowNav(!showNav)}
          />
          {course?.name}
        </h2>
      </div>
      <hr />

      <div className="d-flex">
        {/* 第二栏导航 - 可切换显示 */}
        {showNav && (
          <div
            style={{
              minWidth: 150,
              zIndex: 999,
            }}
            className="bg-light shadow position-relative d-none d-md-block"
          >
            <CourseNavigation params={{ cid: String(cid) }} />
          </div>
        )}

        {/* 主内容区 */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
