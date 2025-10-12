import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import KambazNavigation from "../../Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb"; 

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
      <KambazNavigation />

      <div className="flex-fill" style={{ marginLeft: 120, padding: 20 }}>
        <Breadcrumb course={course} />

        <div className="d-flex">
          <CourseNavigation params={{ cid }}/>


          <div className="flex-fill" style={{ marginLeft: 150, padding: 20 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
