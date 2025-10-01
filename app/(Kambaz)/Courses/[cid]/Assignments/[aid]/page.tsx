"use client";

import { Form, Button } from "react-bootstrap";
import { useParams } from "next/navigation";

export default function AssignmentEditor() {
  const { aid } = useParams(); 


  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h3 className="fw-bold mb-3">Edit Assignment</h3>
      <hr />

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={`${aid}`} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            defaultValue="The assignment is available online. Submit a link to the landing page of your work."
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group className="mb-3" controlId="wd-group">
          <Form.Label className="fw-semibold">Assignment Group</Form.Label>
          <Form.Select>
            <option>ASSIGNMENTS</option>
            <option>EXAMS</option>
          </Form.Select>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group className="mb-3" controlId="wd-display-grade-as">
          <Form.Label className="fw-semibold">Display Grade as</Form.Label>
          <Form.Select>
            <option>Percentage</option>
            <option>Points</option>
            <option>Letter</option>
          </Form.Select>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label className="fw-semibold">Submission Type</Form.Label>
          <Form.Select>
            <option>Online</option>
            <option>On Paper</option>
          </Form.Select>
        </Form.Group>

        {/* Online Entry Options */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Online Entry Options</Form.Label>
          <div>
            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
            <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
          </div>
        </Form.Group>

        {/* Assign To */}
        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label className="fw-semibold">Assign to</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-3" controlId="wd-due-date">
          <Form.Label className="fw-semibold">Due</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        {/* Available From & Until */}
        <Form.Group className="mb-3" controlId="wd-available-from">
          <Form.Label className="fw-semibold">Available from</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control type="date" />
            <span className="align-self-center">Until</span>
            <Form.Control type="date" />
          </div>
        </Form.Group>

        <div className="mt-4">
          <Button variant="danger" type="submit">
            Save
          </Button>{" "}
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
