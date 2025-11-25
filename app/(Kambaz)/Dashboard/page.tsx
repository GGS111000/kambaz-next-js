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
    name: "New Course",
    number: "NEW001",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  /** 当前用户已经 enroll 的课程 ID 列表 */
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  /** 从数据库加载所有课程（只要 name + description 即可） */
  const fetchCourses = async () => {
    try {
      const cs = await client.findAllCourses();
      dispatch(setCourses(cs));
    } catch (e) {
      console.error("fetchCourses failed", e);
    }
  };

  /** 从数据库加载“当前用户已经选了哪些课” */
  const fetchEnrolledCourses = async () => {
    if (!currentUser) {
      setEnrolledIds([]);
      return;
    }
    try {
      const myCourses = await client.findMyCourses(); // GET /api/users/current/courses
      const ids = myCourses.map((c: any) => c._id);
      setEnrolledIds(ids);
    } catch (e) {
      console.error("fetchEnrolledCourses failed", e);
    }
  };

  /** 首次挂载：加载课程列表 */
  useEffect(() => {
    fetchCourses();
  }, []);

  /** 当前用户变化时：刷新已选课程 */
  useEffect(() => {
    fetchEnrolledCourses();
  }, [currentUser]);

  /** 新增课程（会在后端顺带给当前用户 enroll） */
  const onAddNewCourse = async () => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      await fetchEnrolledCourses(); // 新建后刷新我的课程
      alert("Course added.");
    } catch (e) {
      console.error("createCourse failed", e);
      alert("Failed to add course.");
    }
  };

  /** 删除课程（会在后端删掉所有 enrollments） */
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

  /** 更新课程基本信息 */
  const onUpdateCourse = async () => {
    try {
      const updated = await client.updateCourse(course);
      dispatch(
        setCourses(courses.map((c) => (c._id === course._id ? updated : c)))
      );
      alert("Course updated.");
    } catch (e) {
      console.error("updateCourse failed", e);
      alert("Failed to update course.");
    }
  };

  /** ENROLL：调用后端 API + 刷新本地 enrolledIds */
  const onEnroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      await client.enrollIntoCourse(currentUser._id, courseId);
      await fetchEnrolledCourses(); // 重新拉一次「我选了哪些课」
      alert("Enrolled!");
    } catch (e) {
      console.error("enrollIntoCourse failed", e);
      alert("Failed to enroll.");
    }
  };

  /** UNENROLL：调用后端 API + 刷新本地 enrolledIds */
  const onUnenroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in first.");
      return;
    }
    try {
      await client.unenrollFromCourse(currentUser._id, courseId);
      await fetchEnrolledCourses();
      alert("Unenrolled.");
    } catch (e) {
      console.error("unenrollFromCourse failed", e);
      alert("Failed to unenroll.");
    }
  };

  /** 判断某门课当前用户是否已选：
   * 只看 course._id 是否出现在 enrolledIds 里
   */
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrolledIds.includes(courseId);
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1>Dashboard</h1>
      <hr />

      {/* FORM - Add / Edit / Update */}
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
        value={course.name}
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <FormControl
        className="mb-2"
        as="textarea"
        rows={3}
        value={course.description}
        placeholder="Description"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />

      <hr />

      {/* ALL COURSES DISPLAY */}
      <Row xs={1} md={5} className="g-4">
        {courses.map((course) => (
          <Col key={course._id} style={{ width: "300px" }}>
            <Card>
              <Link
                href={`/Courses/${course._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  src={course.image || "/images/reactjs.jpg"}
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>
                </Card.Body>
              </Link>

              <div className="p-2 d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() =>
                    (window.location.href = `/Courses/${course._id}/Home`)
                  }
                >
                  Go
                </Button>

                {!isEnrolled(course._id) ? (
                  <Button
                    variant="success"
                    onClick={() => onEnroll(course._id)}
                  >
                    Enroll
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    onClick={() => onUnenroll(course._id)}
                  >
                    Unenroll
                  </Button>
                )}

                <Button variant="secondary" onClick={() => setCourse(course)}>
                  Edit
                </Button>

                <Button
                  variant="danger"
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
