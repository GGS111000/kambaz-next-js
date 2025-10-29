// // "use client";

// // import { Form } from "react-bootstrap";
// // import { useParams } from "next/navigation";
// // import Link from "next/link";
// // import * as db from "../../../../Database";

// // export default function AssignmentEditor() {
// //   const { cid, aid } = useParams<{ cid: string; aid: string }>();

// //   const assignments = db.assignments || [];
// //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const assignment = assignments.find((a: any) => a._id === aid);

// //   const description =
// //     "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.";

// //   const dueDate = "2025-05-13T23:59";
// //   const availableDate = "2025-05-06T00:00";

// //   return (
// //     <div className="container mt-4" id="wd-assignments-editor">
// //       <h3 className="fw-bold mb-3 text-danger">{assignment?.title || "Assignment"}</h3>
// //       <hr />

// //       <Form>

// //         <Form.Group className="mb-3" controlId="wd-name">
// //           <Form.Label className="fw-semibold">Assignment Name</Form.Label>
// //           <Form.Control type="text" defaultValue={assignment?.title || aid} />
// //         </Form.Group>

 
// //         <Form.Group className="mb-3" controlId="wd-description">
// //           <Form.Label className="fw-semibold">Description</Form.Label>
// //           <Form.Control
// //             as="textarea"
// //             rows={8}
// //             defaultValue={description}
// //             style={{ whiteSpace: "pre-line" }}
// //           />
// //         </Form.Group>

  
// //         <Form.Group className="mb-3" controlId="wd-points">
// //           <Form.Label className="fw-semibold">Points</Form.Label>
// //           <Form.Control type="number" defaultValue={100} />
// //         </Form.Group>


// //         <Form.Group className="mb-3 border rounded p-3">
// //           <Form.Label className="fw-semibold mb-2">Assign</Form.Label>


// //           <Form.Group className="mb-3" controlId="wd-assign-to">
// //             <Form.Label className="fw-semibold small">Assign to</Form.Label>
// //             <Form.Control type="text" defaultValue="Everyone" />
// //           </Form.Group>

// //           {/* Due Date */}
// //           <Form.Group className="mb-3" controlId="wd-due-date">
// //             <Form.Label className="fw-semibold small">Due</Form.Label>
// //             <Form.Control type="datetime-local" defaultValue={dueDate} />
// //           </Form.Group>

     
// //           <Form.Group className="mb-3" controlId="wd-available-from">
// //             <Form.Label className="fw-semibold small">Available from</Form.Label>
// //             <div className="d-flex gap-2">
// //               <Form.Control type="datetime-local" defaultValue={availableDate} />
// //               <span className="align-self-center">Until</span>
// //               <Form.Control type="datetime-local" />
// //             </div>
// //           </Form.Group>
// //         </Form.Group>

    
// //         <div className="mt-4 text-end">
// //           <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
// //             Cancel
// //           </Link>
// //           <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
// //             Save
// //           </Link>
// //         </div>
// //       </Form>
// //     </div>
// //   );
// // }



// "use client";

// import { Form } from "react-bootstrap";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import * as db from "../../../../Database";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { updateAssignment } from "../../Assignments/reducer";
// import { deleteAssignment } from "./reducer";
// import { FaTrash } from "react-icons/fa";



// export default function AssignmentEditor() {
//   const { cid, aid } = useParams<{ cid: string; aid: string }>();
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const assignment = useSelector((state: any) =>
//     state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
//   );

//   const [form, setForm] = useState({
//     title: assignment?.title || "",
//     description:
//       assignment?.description ||
//       "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.",
//     points: assignment?.points || 100,
//     due: assignment?.due || "2025-05-13T23:59",
//     availableFrom: assignment?.availableFrom || "2025-05-06T00:00",
//     availableUntil: assignment?.availableUntil || "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     dispatch(updateAssignment({ _id: aid, course: cid, ...form }));
//     router.push(`/Courses/${cid}/Assignments`);
//   };

//   const handleCancel = () => {
//     router.push(`/Courses/${cid}/Assignments`);
//   };
// const dispatch = useDispatch();
// const [showConfirmId, setShowConfirmId] = useState<string | null>(null);

// const handleDelete = (aid: string) => {
//   dispatch(deleteAssignment(aid));
//   setShowConfirmId(null); // 关闭弹窗
// };

//   return (
//     <div className="container mt-4" id="wd-assignments-editor">
//       <h3 className="fw-bold mb-3 text-danger">{form.title || "Assignment"}</h3>
//       <hr />

//       <Form>
//         <Form.Group className="mb-3" controlId="wd-name">
//           <Form.Label className="fw-semibold">Assignment Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-description">
//           <Form.Label className="fw-semibold">Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={8}
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             style={{ whiteSpace: "pre-line" }}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-points">
//           <Form.Label className="fw-semibold">Points</Form.Label>
//           <Form.Control
//             type="number"
//             name="points"
//             value={form.points}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3 border rounded p-3">
//           <Form.Label className="fw-semibold mb-2">Assign</Form.Label>

//           <Form.Group className="mb-3" controlId="wd-assign-to">
//             <Form.Label className="fw-semibold small">Assign to</Form.Label>
//             <Form.Control type="text" defaultValue="Everyone" disabled />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="wd-due-date">
//             <Form.Label className="fw-semibold small">Due</Form.Label>
//             <Form.Control
//               type="datetime-local"
//               name="due"
//               value={form.due}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="wd-available-from">
//             <Form.Label className="fw-semibold small">Available from</Form.Label>
//             <div className="d-flex gap-2">
//               <Form.Control
//                 type="datetime-local"
//                 name="availableFrom"
//                 value={form.availableFrom}
//                 onChange={handleChange}
//               />
//               <span className="align-self-center">Until</span>
//               <Form.Control
//                 type="datetime-local"
//                 name="availableUntil"
//                 value={form.availableUntil}
//                 onChange={handleChange}
//               />
//             </div>
//           </Form.Group>
//         </Form.Group>

//         <div className="mt-4 text-end">
//           <button className="btn btn-secondary me-2" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button className="btn btn-danger" onClick={handleSave}>
//             Save
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }
"use client";

import { Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAssignment, deleteAssignment } from "../../Assignments/reducer";
import { FaTrash } from "react-icons/fa";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();
  const router = useRouter();

  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  );

  const [form, setForm] = useState({
    title: assignment?.title || "",
    description:
      assignment?.description ||
      "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.",
    points: assignment?.points || 100,
    due: assignment?.due || "2025-05-13T23:59",
    availableFrom: assignment?.availableFrom || "2025-05-06T00:00",
    availableUntil: assignment?.availableUntil || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateAssignment({ _id: aid, course: cid, ...form }));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // 删除相关逻辑 👇
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDelete = () => {
    dispatch(deleteAssignment(aid));
    setShowConfirm(false);
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-danger">
          {form.title || "Assignment"}
        </h3>
        <FaTrash
          className="text-danger cursor-pointer"
          role="button"
          onClick={() => setShowConfirm(true)}
          title="Delete assignment"
        />
      </div>
      <hr />

      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ whiteSpace: "pre-line" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={form.points}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 border rounded p-3">
          <Form.Label className="fw-semibold mb-2">Assign</Form.Label>

          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label className="fw-semibold small">Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label className="fw-semibold small">Due</Form.Label>
            <Form.Control
              type="datetime-local"
              name="due"
              value={form.due}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-semibold small">Available from</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="datetime-local"
                name="availableFrom"
                value={form.availableFrom}
                onChange={handleChange}
              />
              <span className="align-self-center">Until</span>
              <Form.Control
                type="datetime-local"
                name="availableUntil"
                value={form.availableUntil}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Form.Group>

        <div className="mt-4 text-end">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            Save
          </button>
        </div>
      </Form>

      {/* 删除确认弹窗 👇 */}
      {showConfirm && (
        <div
          className="position-absolute bg-white border rounded p-4 shadow"
          style={{
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            minWidth: "300px",
          }}
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{form.title}</strong>?
          </p>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
