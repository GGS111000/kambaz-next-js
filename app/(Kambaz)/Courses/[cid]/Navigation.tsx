"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="list-group rounded-0"
      style={{ width: 180 }}
    >
      {links.map((link) => {
        const path = `/Courses/${cid}/${link}`;
        const active = pathname === path ? "fw-bold text-dark" : "text-danger";
        return (
          <Link
            key={link}
            href={path}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${active}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
