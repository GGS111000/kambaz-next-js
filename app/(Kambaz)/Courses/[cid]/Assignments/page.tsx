"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { addAssignment, deleteAssignment, editAssignment, updateAssignment } from "./reducer";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const assignments = useSelector((state: any) =>
    state.assignmentsReducer?.assignments ?? state.assignments?.assignments ?? []
  ).filter((a: any) => String(a.course) === String(cid));

  const handleAdd = () => {
    const title = prompt("Enter assignment title:");
    if (title) {
      dispatch(addAssignment({ title, course: cid }));
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Assignments</h3>
        <Button variant="danger" onClick={handleAdd}>
          + Add Assignment
        </Button>
      </div>

      {assignments.map((a: any) => (
        <div
          key={a._id}
          className="p-3 border rounded mb-2 bg-light d-flex justify-content-between align-items-center"
        >
          {a.editing ? (
            <input
              className="form-control w-50"
              defaultValue={a.title}
              onChange={(e) =>
                dispatch(updateAssignment({ ...a, title: e.target.value }))
              }
              onBlur={() =>
                dispatch(updateAssignment({ ...a, editing: false }))
              }
              autoFocus
            />
          ) : (
            <span className="fw-semibold">{a.title}</span>
          )}

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(editAssignment(a._id))}
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => dispatch(deleteAssignment(a._id))}
            >
              <FaTrash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
