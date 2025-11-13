/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

/* 课程索引页：列出所有课程，并可跳到 Modules */
export default function CoursesIndexPage() {
  const { courses } = useSelector((s: any) => s.coursesReducer ?? { courses: [] });

  if (!courses?.length) {
    return (
      <div className="p-3">
        <h2>Courses</h2>
        <p>No courses found.</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((c: any) => (
          <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold">{c.name}</div>
              <div className="text-muted small">{c.description}</div>
            </div>
            <Link href={`/Courses/${c._id}/Modules`} className="btn btn-danger">
              Open Modules
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
