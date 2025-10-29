<<<<<<< HEAD
// "use client";
// import Link from "next/link";
// // import { usePathname } from "next/navigation";
// import { usePathname, useParams } from "next/navigation"; // ✅ 一定要加 useParams

// export default function CourseNavigation({ params }: { params: { cid: string } }) {
//   const { cid } = useParams<{ cid: string }>();
//   const pathname = usePathname();
// if (!cid) return null;
//   // ✅ 数据驱动导航数组（包含所有教材要求的链接）
//   const links = [
//     { label: "Home", path: `/Courses/${cid}/Home` },
//     { label: "Modules", path: `/Courses/${cid}/Modules` },
//     { label: "Piazza", path: `/Courses/${cid}/Piazza` },
//     { label: "Zoom", path: `/Courses/${cid}/Zoom` },
//     { label: "Assignments", path: `/Courses/${cid}/Assignments` },
//     { label: "Quizzes", path: `/Courses/${cid}/Quizzes` },
//     { label: "People", path: `/Courses/${cid}/People/Table` }, // ✅ 保留 /People/Table
//   ];

//   return (
//     <div
//       id="wd-courses-navigation"
//       className="list-group fs-5 rounded-0 position-fixed text-start"
//       style={{
//         width: 150,
//         backgroundColor: "white",
//         borderRight: "1px solid lightgray",
//       }}
//     >
//       {links.map((link) => {
//         const isActive = pathname === link.path; // ✅ 判断当前页是否匹配
//         return (
//           <Link
//             key={link.label}
//             href={link.path}
//             id={`wd-course-${link.label.toLowerCase()}-link`}
//             className={`list-group-item border-0 ${
//               isActive ? "fw-bold text-danger" : "text-danger"
//             }`}
//             style={{
//               backgroundColor: "white",
//               textAlign: "left",
//               paddingLeft: "1rem",
//               textDecoration: "none",
//             }}
//           >
//             {link.label}
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";

export default function CourseNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Home",        href: "Home" },
    { label: "Modules",     href: "Modules" },
    { label: "Assignments", href: "Assignments" },
    { label: "Grades",      href: "Grades" },
  ];

  return (
    <Nav className="flex-column me-3 pe-2 border-end" variant="pills">
      {links.map((l) => {
        const href = `./${l.href}`;
        const active = pathname.endsWith(`/${l.href}`) || pathname.endsWith(`/`);
        return (
          <Nav.Item key={l.href} className="mb-1">
            <Nav.Link as={Link} href={href} active={active}>
              {l.label}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
}
=======
import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/Courses/1234/Home" id="wd-course-home-link">Home</Link><br/>
      <Link href="/Courses/1234/Modules" id="wd-course-modules-link">Modules
        </Link><br/>
      <Link href="/Courses/1234/Piazza" id="wd-course-piazza-link">Piazza</Link><br/>
      <Link href="/Courses/1234/Zoom" id="wd-course-zoom-link">Zoom</Link><br/>
      <Link href="/Courses/1234/Assignments" id="wd-course-quizzes-link">
          Assignments</Link><br/>
      <Link href="/Courses/1234/Quizzes" id="wd-course-assignments-link">Quizzes
        </Link><br/>
      <Link href="/Courses/1234/Grades" id="wd-course-grades-link">Grades</Link><br/>
      <Link href="/Courses/1234/People/Table" id="wd-course-people-link">People</Link><br/>
    </div>
  );}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
