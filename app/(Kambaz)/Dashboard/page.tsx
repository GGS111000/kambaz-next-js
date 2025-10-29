<<<<<<< HEAD
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";

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
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  // form state — Edit button copies the clicked course here
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>

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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4" id="wd-dashboard-courses">
          {courses.map((c: Course) => (
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

                    {/* limit description to ~2 lines */}
                    <CardText className="wd-dashboard-course-description line-clamp-2">
                      {c.description}
                    </CardText>

                    <button className="btn btn-primary">Go</button>

                    {/* Delete: add Bootstrap danger style and prevent navigation */}
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

                    {/* Edit: copy selected course into form for updating */}
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
          ))}
        </div>
      </div>
    </div>
  );
}
=======
import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="react-logo" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course1.jpg" alt="photo-course-1" width={200} height={150} />
            <div>
              <h5> CS5700 Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                Computer Network{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course2.jpg" alt="photo-course-2" width={200} height={150} />
            <div>
              <h5> AI in Action </h5>
              <p className="wd-dashboard-course-title">
                Building Your Essential AI Tool Kit{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course3.jpg" alt="photo-course-3" width={200} height={150} />
            <div>
              <h5> Career Design Course </h5>
              <p className="wd-dashboard-course-title">
                Career.design{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course4.jpg" alt="photo-course-4" width={200} height={150} />
            <div>
              <h5> CS5002 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
              Discrete Structures{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course5.jpg" alt="photo-course-5" width={200} height={150} />
            <div>
              <h5> CS5004 OOD </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Design{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course6.jpg" alt="photo-course-6" width={200} height={150} />
            <div>
              <h5> CS5008 Data Str </h5>
              <p className="wd-dashboard-course-title">
                Data str, Algo & App in computer system{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course7.jpg" alt="photo-course-7" width={200} height={150} />
            <div>
              <h5> CS5800 Algorithms Summer </h5>
              <p className="wd-dashboard-course-title">
              Algorithms Summer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course8.jpg" alt="photo-course-8" width={200} height={150} />
            <div>
              <h5> CS5009 Recitation </h5>
              <p className="wd-dashboard-course-title">
                Recitation for CS5008{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course"> ... </div>
        <div className="wd-dashboard-course"> ... </div>
      </div>
    </div>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
