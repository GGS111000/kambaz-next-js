/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import * as client from "../client";
import { RootState } from "../../../../store";

import {
  addAssignment,
  updateAssignment,
} from "../reducer";

export default function AssignmentEditor() {
  const router = useRouter();
  const params = useParams();
  const cid = params?.cid as string;
  const aid = params?.aid as string;

  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (aid === "new") return;

    const existing = assignments.find((a: any) => a._id === aid);
    if (existing) setAssignment(existing);
  }, [aid, assignments]);

  const save = async () => {
    if (aid === "new") {
      const created = await client.createAssignmentForCourse(
        cid,
        assignment
      );
      dispatch(addAssignment(created));
    } else {
      const updated = await client.updateAssignment(assignment);
      dispatch(updateAssignment(updated));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-3">
      <h3>{aid === "new" ? "New Assignment" : "Edit Assignment"}</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={assignment.dueDate}
            onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
          />
        </Form.Group>

        <Button onClick={save} className="me-2">
          Save
        </Button>

        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
