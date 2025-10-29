"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/redux-client";
import { enroll, unenroll } from "./EnrollmentReducer";
 
export default function Dashboard() {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((s: any) => s?.accountReducer?.currentUser ?? null);
  const allEnrollments = useSelector((s: any) => s?.enrollmentReducer?.enrollments ?? []);
  const courses = useSelector((s: any) => s?.coursesReducer?.courses ?? []);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
 
  const isEnrolled = (courseId: string) =>
    !!currentUser &&
    allEnrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);
 
  return (
<div id="wd-dashboard">
<div className="d-flex justify-content-between align-items-center">
<h1 id="wd-dashboard-title">Dashboard</h1>
<button className="btn btn-info" onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "My Enrollments" : "All Courses"}
</button>
</div>
<hr />
 
      <h5>
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
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
>
          Update
</button>
</h5>
 
      <br />
<FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: (e.target as HTMLInputElement).value })}
      />
<FormControl
        as="textarea"
        rows={3}
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: (e.target as HTMLTextAreaElement).value })}
      />
 
      <hr />
<h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
<hr />
 
      <div id="wd-dashboard-courses">
<Row xs={1} md={5} className="g-4">
          {courses
            .filter((c: any) => (showAllCourses ? true : isEnrolled(c._id)))
            .map((c: any) => (
<Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
<Card>
<Link
                    href={`/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
>
<CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
<CardBody className="card-body">
<CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
</CardTitle>
<CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
>
                        {c.description}
</CardText>
<Button variant="primary">Go</Button>
 
                      {currentUser?.role !== "FACULTY" && (
                        isEnrolled(c._id) ? (
<Button
                            className="btn btn-danger ms-2"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(unenroll({ userId: currentUser!._id, courseId: c._id }));
                            }}
>
                            Unenroll
</Button>
                        ) : (
<Button
                            className="btn btn-success ms-2"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!currentUser) return;
                              dispatch(enroll({ userId: currentUser._id, courseId: c._id }));
                            }}
>
                            Enroll
</Button>
                        )
                      )}
 
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteCourse(c._id));
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
>
                        Delete
</button>
 
                      <button
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c);
                        }}
                        className="btn btn-warning me-2 float-end"
>
                        Edit
</button>
</CardBody>
</Link>
</Card>
</Col>
            ))}
</Row>
</div>
</div>
  );
}