"use client";

import { Form, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  // ✅ 从数据库读取
  const assignments = db.assignments || [];
  const assignment = assignments.find((a: any) => a._id === aid);

  // ✅ 模拟一些扩展数据（如果 JSON 中没有）
  const description =
    "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.";

  const dueDate = "2025-05-13T23:59";
  const availableDate = "2025-05-06T00:00";

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h3 className="fw-bold mb-3 text-danger">{assignment?.title || "Assignment"}</h3>
      <hr />

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title || aid} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            defaultValue={description}
            style={{ whiteSpace: "pre-line" }}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>

        {/* Assign Section */}
        <Form.Group className="mb-3 border rounded p-3">
          <Form.Label className="fw-semibold mb-2">Assign</Form.Label>

          {/* Assign To */}
          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label className="fw-semibold small">Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" />
          </Form.Group>

          {/* Due Date */}
          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label className="fw-semibold small">Due</Form.Label>
            <Form.Control type="datetime-local" defaultValue={dueDate} />
          </Form.Group>

          {/* Available Dates */}
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-semibold small">Available from</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control type="datetime-local" defaultValue={availableDate} />
              <span className="align-self-center">Until</span>
              <Form.Control type="datetime-local" />
            </div>
          </Form.Group>
        </Form.Group>

        {/* Save & Cancel */}
        <div className="mt-4 text-end">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
