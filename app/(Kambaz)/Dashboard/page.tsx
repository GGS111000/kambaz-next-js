/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { RootState } from "../store";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import * as client from "../Courses/client";  // <<--- 新增：使用 server API
import {
  setCourses,
  updateCourse as updateReduxCourse,
} from "../Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();

  /** Redux State */
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  /** Local State for creating/updating course */
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "NEW001",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  /** Load courses from DATABASE (MongoDB) */
  const fetchCourses = async () => {
    const cs = await client.findAllCourses();
    dispatch(setCourses(cs));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /** Add new course */
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    alert("Course added.");
  };

  /** Delete */
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    alert("Course deleted.");
  };

  /** Update */
  const onUpdateCourse = async () => {
    const updated = await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => (c._id === course._id ? updated : c))
      )
    );
    alert("Course updated.");
  };

  /** ENROLL --- NOW USING SERVER API */
  const onEnroll = async (courseId: string) => {
    if (!currentUser) return alert("Please sign in first.");

    await client.enrollIntoCourse(currentUser._id, courseId);

    alert("Enrolled!");

    fetchCourses(); // reload courses
  };

  /** UNENROLL --- NOW USING SERVER API */
  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return alert("Please sign in first.");

    await client.unenrollFromCourse(currentUser._id, courseId);

    alert("Unenrolled.");

    fetchCourses(); // reload courses
  };

  /** CHECK ENROLLMENT FROM SERVER */
  const isEnrolled = (course: any) => {
    if (!currentUser) return false;
    if (!course?.students) return false;
    return course.students.includes(currentUser._id);
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

                {!isEnrolled(course) ? (
                  <Button variant="success" onClick={() => onEnroll(course._id)}>
                    Enroll
                  </Button>
                ) : (
                  <Button variant="dark" onClick={() => onUnenroll(course._id)}>
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
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Link from "next/link";

// import { RootState } from "../store";
// import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
// import { v4 as uuidv4 } from "uuid";

// import * as db from "../Database";
// import coursesData from "../Database/courses.json";

// import {
//   setCourses,
//   updateCourse as updateReduxCourse,
// } from "../Courses/reducer";

// import {
//   enroll,
//   unenroll,
// } from "../Enrollments/EnrollmentReducer";
// import * as client from "../Courses/client"; 


// export default function Dashboard() {
//   const dispatch = useDispatch();

//   /** Redux State */
//   const { courses } = useSelector((state: RootState) => state.coursesReducer);
//   const { enrollments } = useSelector(
//     (state: RootState) => state.enrollmentsReducer
//   );
//   const { currentUser } = useSelector(
//     (state: RootState) => state.accountReducer
//   );

//   /** Use ONLY the first 5 courses from Database */
//   const initialCourses = coursesData.slice(0, 5);

//   /** State for editing/creating course */
//   const [course, setCourse] = useState<any>({
//     _id: "0",
//     name: "New Course",
//     number: "NEW001",
//     startDate: "2023-01-10",
//     endDate: "2023-05-15",
//     description: "New Description",
//     image: "/images/reactjs.jpg",
//   });

//   /** Initialize courses in Redux if not loaded */
//   useEffect(() => {
//     if (!courses || courses.length === 0) {
//       dispatch(setCourses(initialCourses));
//     }
//   }, []);

//   /** Add Course */
//   const onAddNewCourse = () => {
//     const newCourse = { ...course, _id: uuidv4() };
//     dispatch(setCourses([...courses, newCourse]));
//     alert("Course added.");
//   };

//   /** Delete */
//   const onDeleteCourse = (courseId: string) => {
//     const updated = courses.filter((c) => c._id !== courseId);
//     dispatch(setCourses(updated));
//     alert("Course deleted.");
//   };

//   /** Update */
//   const onUpdateCourse = () => {
//     dispatch(
//       setCourses(
//         courses.map((c) => (c._id === course._id ? course : c))
//       )
//     );
//     alert("Course updated.");
//   };

//   /** Enroll */
//   const onEnroll = (courseId: string) => {
//     if (!currentUser) return alert("Please sign in first.");
//     dispatch(enroll({ userId: currentUser._id, courseId }));
//   };

//   /** Unenroll */
//   const onUnenroll = (courseId: string) => {
//     if (!currentUser) return alert("Please sign in first.");
//     dispatch(unenroll({ userId: currentUser._id, courseId }));
//   };

//   /** Check if current user enrolled this course */
//   const isEnrolled = (courseId: string) => {
//     if (!currentUser) return false;
//     return enrollments.some(
//       (e) => e.user === currentUser._id && e.course === courseId
//     );
//   };

//   return (
//     <div className="p-4" id="wd-dashboard">
//       <h1>Dashboard</h1>
//       <hr />

//       {/* FORM - Add / Edit / Update */}
//       <h5>
//         Manage Course
//         <button
//           className="btn btn-primary float-end"
//           onClick={onAddNewCourse}
//         >
//           Add
//         </button>
//         <button
//           className="btn btn-warning float-end me-2"
//           onClick={onUpdateCourse}
//         >
//           Update
//         </button>
//       </h5>

//       <FormControl
//         className="mb-2"
//         value={course.name}
//         placeholder="Course Name"
//         onChange={(e) =>
//           setCourse({ ...course, name: e.target.value })
//         }
//       />

//       <FormControl
//         className="mb-2"
//         as="textarea"
//         rows={3}
//         value={course.description}
//         placeholder="Description"
//         onChange={(e) =>
//           setCourse({ ...course, description: e.target.value })
//         }
//       />

//       <hr />

//       {/* ALL COURSES DISPLAY */}
//       <Row xs={1} md={5} className="g-4">
//         {courses.map((course) => (
//           <Col key={course._id} style={{ width: "300px" }}>
//             <Card>
//               <Link
//                 href={`/Courses/${course._id}/Home`}
//                 className="text-decoration-none text-dark"
//               >
//                 <Card.Img
//                   src={course.image || "/images/reactjs.jpg"}
//                   height={160}
//                 />
//                 <Card.Body>
//                   <Card.Title className="text-nowrap overflow-hidden">
//                     {course.name}
//                   </Card.Title>
//                   <Card.Text
//                     className="overflow-hidden"
//                     style={{ height: "100px" }}
//                   >
//                     {course.description}
//                   </Card.Text>
//                 </Card.Body>
//               </Link>

//               <div className="p-2 d-flex justify-content-between">

//   <Button
//     variant="primary"
//     onClick={() => window.location.href = `/Courses/${course._id}/Home`}
//   >
//     Go
//   </Button>

//   {!isEnrolled(course._id) ? (
//     <Button variant="success" onClick={() => onEnroll(course._id)}>
//       Enroll
//     </Button>
//   ) : (
//     <Button variant="dark" onClick={() => onUnenroll(course._id)}>
//       Unenroll
//     </Button>
//   )}

//   <Button variant="secondary" onClick={() => setCourse(course)}>
//     Edit
//   </Button>

//   <Button
//     variant="danger"
//     onClick={() => onDeleteCourse(course._id)}
//   >
//     Delete
//   </Button>
// </div>

//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }
