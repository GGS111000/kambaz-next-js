"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { usePathname, useParams } from "next/navigation"; // ✅ 一定要加 useParams

export default function CourseNavigation({ params }: { params: { cid: string } }) {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();
if (!cid) return null;
  // ✅ 数据驱动导航数组（包含所有教材要求的链接）
  const links = [
    { label: "Home", path: `/Courses/${cid}/Home` },
    { label: "Modules", path: `/Courses/${cid}/Modules` },
    { label: "Piazza", path: `/Courses/${cid}/Piazza` },
    { label: "Zoom", path: `/Courses/${cid}/Zoom` },
    { label: "Assignments", path: `/Courses/${cid}/Assignments` },
    { label: "Quizzes", path: `/Courses/${cid}/Quizzes` },
    { label: "People", path: `/Courses/${cid}/People/Table` }, // ✅ 保留 /People/Table
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="list-group fs-5 rounded-0 position-fixed text-start"
      style={{
        width: 150,
        backgroundColor: "white",
        borderRight: "1px solid lightgray",
      }}
    >
      {links.map((link) => {
        const isActive = pathname === link.path; // ✅ 判断当前页是否匹配
        return (
          <Link
            key={link.label}
            href={link.path}
            id={`wd-course-${link.label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "fw-bold text-danger" : "text-danger"
            }`}
            style={{
              backgroundColor: "white",
              textAlign: "left",
              paddingLeft: "1rem",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
