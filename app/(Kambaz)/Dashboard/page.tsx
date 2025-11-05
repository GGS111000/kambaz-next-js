"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { toggleEnrollment } from "../Enrollments/EnrollmentReducer";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();

  // normalize courses selector (backwards compatible)
  const courses: Course[] = useSelector((state: any) =>
    state.coursesReducer?.courses ?? state.courses?.courses ?? []
  );

  // current signed-in user (compatible keys)
  const currentUser: any = useSelector((state: any) =>
    state.account?.currentUser ?? state.accountReducer?.currentUser ?? null
  );

  // enrollments array from redux (compatible keys)
  const allEnrollments: any[] = useSelector((state: any) =>
    state.enrollment?.enrollments ?? state.enrollmentReducer?.enrollments ?? []
  );

  // 现有的“新增/编辑”表单状态（保持你的原样）
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // ✅ 仅查看“我的 Enrollments”切换
  const [showMyEnrollments, setShowMyEnrollments] = useState(false);

  // compute set of courseIds the currentUser is enrolled in
  const enrolledIds = useMemo(() => {
    if (!currentUser) return new Set<string>();
    return new Set(allEnrollments.filter((e: any) => e.user === currentUser._id).map((e: any) => e.course));
  }, [allEnrollments, currentUser]);

  // visible list depends on toggle
  const visibleCourses: Course[] = useMemo(() => {
    if (!showMyEnrollments) return courses as Course[];
    return (courses as Course[]).filter((c) => enrolledIds.has(c._id));
  }, [courses, showMyEnrollments, enrolledIds]);

  // toggle enroll action — requires sign-in
  const toggleEnrollHandler = (courseId: string) => {
    if (!currentUser) {
      // simple UX: ask to sign in first
      // You could route to sign-in page instead
      alert("Please sign in to enroll");
      return;
    }
    dispatch(toggleEnrollment({ userId: currentUser._id, courseId }));
  };

  const myCount = enrolledIds.size;

  return (
    <div id="wd-dashboard">
      {/* 顶部栏：标题 + 功能按钮 */}
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>

        {/* ✅ 右上角：My Enrollments 切换 */}
        <div className="d-flex align-items-center gap-2">
          <Button
            variant={showMyEnrollments ? "outline-secondary" : "secondary"}
            onClick={() => setShowMyEnrollments(false)}
            title="Show All Courses"
          >
            All Courses
          </Button>
          <Button
            variant={showMyEnrollments ? "danger" : "outline-danger"}
            onClick={() => setShowMyEnrollments(true)}
            title="Show My Enrollments"
          >
            My Enrollments ({myCount})
          </Button>
        </div>
      </div>

      <hr className="my-3" />

      {/* 新建/更新课程（保留你的原逻辑） */}
      <h5 className="mt-2">
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>

      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      {/* 标题根据当前视图切换 */}
      <h2 id="wd-dashboard-published">
        {showMyEnrollments
          ? `My Enrollments (${visibleCourses.length})`
          : `Published Courses (${visibleCourses.length})`}
      </h2>
      <hr />

      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4" id="wd-dashboard-courses">
          {visibleCourses.map((c: Course) => {
          const isEnrolled = enrolledIds.has(c._id);
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  {/* 卡片整体链接到课程 Home；内部按钮都要 preventDefault 防止误导航 */}
                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>

                      {/* limit description to ~2 lines */}
                      <CardText className="wd-dashboard-course-description line-clamp-2">
                        {c.description}
                      </CardText>

                      {/* 进入课程 */}
                      <button className="btn btn-primary">Go</button>

                      {/* ✅ Enroll/Unenroll：只改本地状态 */}
                      <button
                        className={`btn ${isEnrolled ? "btn-outline-success" : "btn-success"} ms-2`}
                        onClick={(event) => {
                          event.preventDefault(); // 关键：别触发外层 Link 跳转
                          toggleEnrollHandler(c._id);
                        }}
                        title={isEnrolled ? "Unenroll" : "Enroll"}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </button>

                      {/* Delete：防止导航 */}
                      <button
                        className="btn btn-danger float-end ms-2"
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(c._id));
                        }}
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>

                      {/* Edit：防止导航 */}
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(c);
                        }}
                        className="btn btn-warning float-end"
                      >
                        Edit
                      </button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </div>
      </div>
    </div>
  );
}
