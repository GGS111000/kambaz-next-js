
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import KambazNavigation from "../../Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";


export default async function CourseLayout(props: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { children, params } = props;
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses" className="d-flex">
      <KambazNavigation />
      <div className="flex-fill" style={{ marginLeft: 120, padding: 20 }}>
        <Breadcrumb course={course} />
        <div className="d-flex">
  
          <CourseNavigation params={{ cid }} />
          <div className="flex-fill" style={{ marginLeft: 150, padding: 20 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
