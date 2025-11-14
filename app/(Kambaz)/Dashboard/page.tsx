/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import {
  setCourses,
  addNewCourse,
  deleteCourse as deleteCourseLocal,
  updateCourse as updateCourseLocal,
} from "../Courses/reducer";

import * as client from "../Courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  // 取当前用户
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // 取 Redux 里的课程数组
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  // 用来编辑 / 添加课程
  const [course, setCourse] = useState<any>({
    name: "",
    number: "",
    credits: "",
    description: "",
  });

  /** -----------------------------
   *  从服务器载入当前用户的课程
   * ----------------------------- */
  const fetchCourses = async () => {
    try {
      const myCourses = await client.findMyCourses();
      dispatch(setCourses(myCourses)); // 更新 Redux store
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  // currentUser 变化时重新加载课程
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  /** -----------------------------
   *  Add Course
   * ----------------------------- */
  const onAddCourse = async () => {
    if (!currentUser) return;
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    setCourse({ name: "", number: "", credits: "", description: "" });
  };

  /** -----------------------------
   *  Delete Course
   * ----------------------------- */
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  /** -----------------------------
   *  Update Course
   * ----------------------------- */
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      )
    );
  };

  /** -----------------------------
   *  点击某个课程加载到编辑框
   * ----------------------------- */
  const onEditClick = (course: any) => {
    setCourse(course);
  };

  return (
    <div className="container mt-3" id="wd-dashboard">
      <h2>Dashboard</h2>

      {!currentUser && (
        <div className="alert alert-warning mt-3">
          Please sign in to view your courses.
        </div>
      )}

      {currentUser && (
        <>
          {/* 课程编辑表单 */}
          <div className="card p-3 mb-4">
            <h4>Edit / Add Course</h4>
            <input
              className="form-control mb-2"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) =>
                setCourse({ ...course, name: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Course Number"
              value={course.number}
              onChange={(e) =>
                setCourse({ ...course, number: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) =>
                setCourse({ ...course, credits: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={course.description}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />

            <button
              className="btn btn-primary me-2"
              onClick={onAddCourse}
            >
              Add
            </button>

            <button
              className="btn btn-secondary"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </div>

          {/* 课程列表 */}
          <ul className="list-group">
            {courses.map((c) => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div onClick={() => onEditClick(c)} style={{cursor: "pointer"}}>
                  <b>{c.number}</b> — {c.name}
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteCourse(c._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
