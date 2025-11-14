/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

import * as client from "../Courses/client";
import { setCourses } from "../Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const [course, setCourse] = useState<any>({ name: "" });

  const fetchCourses = async () => {
    try {
      const data = await client.findMyCourses();
      dispatch(setCourses(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentUser) fetchCourses();
  }, [currentUser]);

  const onAddCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async (updated: any) => {
    await client.updateCourse(updated);
    dispatch(
      setCourses(
        courses.map((c) => (c._id === updated._id ? updated : c))
      )
    );
  };

  return (
    <div className="container mt-3">
      <h2>Dashboard</h2>

      <input
        placeholder="New course name"
        className="form-control mb-2"
        onChange={(e) =>
          setCourse({ ...course, name: e.target.value })
        }
      />

      <button className="btn btn-primary mb-3" onClick={onAddCourse}>
        Add Course
      </button>

      <ul className="list-group">
        {courses.map((c) => (
          <li key={c._id} className="list-group-item d-flex justify-content-between">
            <span>{c.name}</span>

            <div>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => onDeleteCourse(c._id)}
              >
                Delete
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  onUpdateCourse({ ...c, name: c.name + "!" })
                }
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
