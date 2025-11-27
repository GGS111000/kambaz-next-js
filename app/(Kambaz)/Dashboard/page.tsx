/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../store";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";

import * as client from "../Courses/client";
import { setCourses } from "../Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();

  /** Redux 里的课程列表 */
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  /** 当前登录用户 */
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  /** 当前正在编辑/新建的课程 */
  const [course, setCourse] = useState<any>({
    _id: "0",
    title: "New Course",
    number: "NEW001",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  /** 当前用户已选课程的 ID 列表 */
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  /** 控制 All Courses / My Courses 显示 */
  const [showAll, setShowAll] = useState<boolean>(true);

  /** 加载所有课程 */
  const fetchCourses = async () => {
    try {
      const cs = await client.findAllCourses();
      dispatch(setCourses(cs));
    } catch (e) {
      console.error("fetchCourses failed", e);
    }
  };

  /** 加载当前用户的 enroll 信息 */
  const fetchEnrolledCourses = async () => {
    if (!currentUser) {
      setEnrolledIds([]);
      return;
    }
    try {
      const myCourses = await client.myEnrollments();
      const ids = myCourses.map((c: any) => c._id);
      setEnrolledIds(ids);
    } catch (e) {
      console.error("fetchEnrolledCourses failed", e);
    }
  };

  /** 初始化加载课程 */
  useEffect(() => {
    fetchCourses();
  }, []);

  /** 用户变化 → 更新 enroll */
  useEffect(() => {
    fetchEnrolledCourses();
  }, [currentUser]);

  /** Create */
  const onAddNewCourse = async () => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      await fetchEnrolledCourses();
      alert("Course added.");
    } catch (e) {
      console.error("createCourse failed", e);
      alert("Failed to add course.");
    }
  };

  /** Delete */
  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
      await fetchEnrolledCourses();
      alert("Course deleted.");
    } catch (e) {
      console.error("deleteCourse failed", e);
      alert("Failed to delete course.");
    }
  };

  /** Update */
  const onUpdateCourse = async () => {
    try {
      const updated = await client.updateCourse({
        ...course,
        _id: course._id,   // <-- 防止 _id 被 undefined 覆盖
      });

      dispatch(
        setCourses(courses.map((c) => (c._id === course._id ? updated : c)))
      );
      alert("Course updated.");
    } catch (e) {
      console.error("updateCourse failed", e);
      alert("Failed to update course.");
    }
  };


  /** Enroll */
  const onEnroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      await client.enrollInCourse(courseId);
      await fetchEnrolledCourses();
      alert("Enrolled!");
    } catch (e) {
      console.error("enrollIntoCourse failed", e);
      alert("Failed to enroll.");
    }
  };

  /** Unenroll */
  const onUnenroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      await client.unenrollFromCourse(courseId);
      await fetchEnrolledCourses();
      alert("Unenrolled.");
    } catch (e) {
      console.error("unenrollFromCourse failed", e);
      alert("Failed to unenroll.");
    }
  };

  /** 是否已选课程 */
  const isEnrolled = (courseId: string) => {
    return currentUser && enrolledIds.includes(courseId);
  };

  /** 根据 showAll 决定显示哪些课程 */
  const displayedCourses = showAll
    ? courses
    : courses.filter((c: any) => enrolledIds.includes(c._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1>Dashboard</h1>
      <hr />

      {/* ---------------------- */}
      {/* All Courses / My Courses */}
      {/* ---------------------- */}
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant={showAll ? "primary" : "secondary"}
          className="me-2"
          onClick={() => setShowAll(true)}
        >
          All Courses
        </Button>

        <Button
          variant={!showAll ? "primary" : "secondary"}
          onClick={() => setShowAll(false)}
        >
          My Courses
        </Button>
      </div>

      {/* ---------------------- */}
      {/* Manage Course Form */}
      {/* ---------------------- */}
      <h5>
        Manage Course
        <button className="btn btn-primary float-end" onClick={onAddNewCourse}>
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={onUpdateCourse}
        >
          Update
        </button>
      </h5>

      <FormControl
        className="mb-2"
        value={course.title || course.name || ""}
        placeholder="Course Name"
        onChange={(e) =>
          setCourse({
            ...course,
            title: e.target.value,
            name: e.target.value, // 确保新/旧课程 title/name 同步
          })
        }
      />

      <FormControl
        className="mb-3"
        as="textarea"
        rows={3}
        value={course.description || ""}
        placeholder="Description"
        onChange={(e) =>
          setCourse({
            ...course,
            description: e.target.value,
          })
        }
      />


      <hr />

      {/* ---------------------- */}
      {/* Course Cards */}
      {/* ---------------------- */}
      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((course: any) => (
          <Col key={course._id} style={{ width: "300px" }}>
            <Card className="shadow-sm" style={{ width: "18rem" }}>
              <Card.Img
                src={course.image || "/images/reactjs.jpg"}
                height={160}
                style={{ objectFit: "cover" }}
              />

              <Card.Body>
                <h5 className="card-title text-primary text-nowrap overflow-hidden">
                  {course.title || course.name}
                </h5>

                <p
                  className="text-muted overflow-hidden"
                  style={{ height: "75px", fontSize: "0.85rem" }}
                >
                  {course.description}
                </p>
              </Card.Body>

              <div className="p-2 d-flex justify-content-between">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/Courses/${course._id}/Home`)
                  }
                >
                  Go
                </Button>

                {!isEnrolled(course._id) ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onEnroll(course._id)}
                  >
                    Enroll
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => onUnenroll(course._id)}
                  >
                    Unenroll
                  </Button>
                )}

                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => setCourse(course)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteCourse(course._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
