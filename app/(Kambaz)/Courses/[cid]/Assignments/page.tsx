/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import { FaSearch, FaPlus } from "react-icons/fa";
// // import { IoEllipsisVertical } from "react-icons/io5";
// // import { Card, Button, Form } from "react-bootstrap";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import GreenCheckmark from "../Modules/GreenCheckmark";
// // import * as db from "../../../Database"; 

// // export default function Assignments() {
// //   const { cid } = useParams<{ cid: string }>();
// //   const assignments = db.assignments || [];

// // // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const courseAssignments = assignments.filter((a: any) => a.course === cid);

// //   return (
// //     <div className="container mt-3">
// //       <h2 className="fw-bold text-danger">ASSIGNMENTS</h2>
// //       <hr />

     
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <div className="d-flex align-items-center w-50">
// //           <FaSearch className="me-2 text-muted" />
// //           <Form.Control
// //             type="text"
// //             placeholder="Search for Assignment"
// //             className="flex-grow-1"
// //           />
// //         </div>
// //         <div>
// //           <Button variant="light" className="me-2 border">
// //             <FaPlus className="me-1" /> Group
// //           </Button>
// //           <Button variant="danger">
// //             <FaPlus className="me-1" /> Assignment
// //           </Button>
// //         </div>
// //       </div>


// //       <Card className="mb-2 shadow-sm border-0">
// //         <Card.Header className="fw-bold d-flex justify-content-between align-items-center bg-light">
// //           <span>ASSIGNMENTS</span>
// //           <div className="d-flex align-items-center">
// //             <span className="text-muted me-2 small">40% of Total</span>
// //             <FaPlus className="me-3 text-muted" />
// //             <IoEllipsisVertical className="fs-4 text-muted" />
// //           </div>
// //         </Card.Header>

// // {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
// //         {courseAssignments.map((a: any) => (
// //           <div
// //             key={a._id}
// //             className="d-flex align-items-center border-top p-3"
// //             style={{ borderLeft: "5px solid green" }}
// //           >
// //             <div className="flex-grow-1">
// //               <Link
// //                 href={`/Courses/${cid}/Assignments/${a._id}`}
// //                 className="fw-bold text-decoration-none text-dark"
// //               >
// //                 {a.title}
// //               </Link>
// //               <p className="mb-0 text-muted small">
// //                 Multiple Modules | Due: TBD | 100 pts
// //               </p>
// //             </div>
// //             <div className="d-flex align-items-center">
// //               <GreenCheckmark />
// //               <IoEllipsisVertical className="fs-4 text-muted ms-2" />
// //             </div>
// //           </div>
// //         ))}

     
// //         {courseAssignments.length === 0 && (
// //           <div className="p-3 text-muted small">No assignments found.</div>
// //         )}
// //       </Card>
// //     </div>
// //   );
// // }
// "use client";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
// import { deleteAssignment } from "../Assignments/reducer";
// import type { Assignment } from "../Assignments/reducer";

// export default function AssignmentsPage() {
//   const { cid } = useParams<{ cid: string }>();
//   const { assignments } = useSelector((s: any) => s.assignmentsReducer);
//   const dispatch = useDispatch();
//   const list: Assignment[] = assignments.filter((a: Assignment) => a.course === cid);

//   return (
//     <div id="wd-assignments">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <input className="form-control w-50" placeholder="Search for Assignment" />
//         <Link href={`/Courses/${cid}/Assignments/new`} className="btn btn-danger">
//           + Assignment
//         </Link>
//       </div>

//       <ListGroup>
//         {list.map((a) => (
//           <ListGroupItem key={a._id} className="d-flex justify-content-between">
//             <div>
//               <Link
//                 href={`/Courses/${cid}/Assignments/${a._id}`}
//                 className="fw-semibold text-decoration-none"
//               >
//                 {a.name}
//               </Link>
//               <div className="text-muted small">
//                 Due {a.dueDate} &nbsp; | &nbsp; {a.points} pts
//               </div>
//             </div>
//             <div className="text-nowrap">
//               <Link
//                 href={`/Courses/${cid}/Assignments/${a._id}`}
//                 className="btn btn-warning me-2"
//               >
//                 Edit
//               </Link>
//               <Button
//                 variant="danger"
//                 onClick={() => dispatch(deleteAssignment(a._id))}
//               >
//                 Delete
//               </Button>
//             </div>
//           </ListGroupItem>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from "react-bootstrap";

export default function AssignmentsPage() {
  const { cid } = useParams();
  const { assignments } = useSelector((s: any) => s.assignmentsReducer);
  const list = assignments.filter((a: any) => a.course === cid);

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: 380 }}>
          <FormControl placeholder="Search for Assignment" />
        </InputGroup>
        <div className="d-flex gap-2">
          <Button variant="light">+ Group</Button>
          <Link href={`/Courses/${cid}/Assignments/new`} className="btn btn-danger">
            + Assignment
          </Link>
        </div>
      </div>

      <ListGroup>
        {list.map((a: any) => (
          <ListGroupItem key={a._id} className="d-flex justify-content-between">
            <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="text-decoration-none">
              {a.title}
            </Link>
            <span className="text-muted">{a.points ?? 100} pts</span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
