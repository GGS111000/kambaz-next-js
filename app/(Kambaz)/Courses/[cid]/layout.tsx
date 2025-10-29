<<<<<<< HEAD
// /* eslint-disable @typescript-eslint/no-explicit-any */


// // import { ReactNode } from "react";
// // import CourseNavigation from "./Navigation";
// // import KambazNavigation from "../../Navigation";
// // import { courses } from "../../Database";
// // import Breadcrumb from "./Breadcrumb";


// // export default async function CourseLayout(props: {
// //   children: ReactNode;
// //   params: Promise<{ cid: string }>;
// // }) {
// //   const { children, params } = props;
// //   const { cid } = await params;
// //   const course = courses.find((c) => c._id === cid);

// //   return (
// //     <div id="wd-courses" className="d-flex">
// //       <KambazNavigation />
// //       <div className="flex-fill" style={{ marginLeft: 120, padding: 20 }}>
// //         <Breadcrumb course={course} />
// //         <div className="d-flex">
  
// //           <CourseNavigation params={{ cid }} />
// //           <div className="flex-fill" style={{ marginLeft: 150, padding: 20 }}>
// //             {children}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // app/(Kambaz)/Courses/[cid]/layout.tsx
// "use client";
// import { ReactNode, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "next/navigation";
// import CourseNavigation from "./Navigation";
// import { FaAlignJustify } from "react-icons/fa6";

// export default function CoursesLayout({ children }: { children: ReactNode }) {
//   const { cid } = useParams();
//   const { courses } = useSelector((s: any) => s.coursesReducer);
//   const course = courses.find((c: any) => c._id === cid);
//   const [showNav, setShowNav] = useState(true);

//   return (
//     <div id="wd-courses">
//       <h2 className="text-danger">
//         <FaAlignJustify
//           className="me-4 fs-4 mb-1"
//           role="button"
//           onClick={() => setShowNav((v) => !v)}
//         />
//         {course?.name}
//       </h2>
//       <hr />
//       <div className="d-flex">
//         {showNav && (
//           <div className="me-3">
//             <CourseNavigation params={{
//               cid: ""
//             }} />
//           </div>
//         )}
//         <div className="flex-fill">{children}</div>
//       </div>
//     </div>
//   );
// }
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: any) => state.coursesReducer);

  // local toggle for the sidebar
  const [showNav, setShowNav] = useState(true);
  const course = courses.find((c: any) => c._id === cid);

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="d-flex align-items-center gap-3">
        <FaAlignJustify
          className="fs-4 text-danger"
          role="button"
          onClick={() => setShowNav((s) => !s)}
          title="Toggle course navigation"
        />
        {course?.name ?? "Course"}
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div style={{ minWidth: 220 }}>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill ps-3">{children}</div>
      </div>
    </div>
  );
}
=======
import { ReactNode } from "react";

import CourseNavigation from "./Navigation";
export default async function CoursesLayout(
  { children, params }: { children: ReactNode; params: Promise<{ cid: string }> }) {
 const { cid } = await params;
 return (
   <div id="wd-courses">
     <h2>Courses {cid}</h2>
     <hr />
     <table>
       <tbody>
         <tr>
           <td valign="top" width="200"> <CourseNavigation /> </td>
           <td valign="top" width="100%"> {children} </td>
         </tr>
       </tbody>
     </table>
   </div>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
