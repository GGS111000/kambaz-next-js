<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignments = db.assignments || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assignment = assignments.find((a: any) => a._id === aid);

  const description =
    "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.";

  const dueDate = "2025-05-13T23:59";
  const availableDate = "2025-05-06T00:00";

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h3 className="fw-bold mb-3 text-danger">{assignment?.title || "Assignment"}</h3>
      <hr />

      <Form>

        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title || aid} />
        </Form.Group>

 
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            defaultValue={description}
            style={{ whiteSpace: "pre-line" }}
          />
        </Form.Group>

  
        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>


        <Form.Group className="mb-3 border rounded p-3">
          <Form.Label className="fw-semibold mb-2">Assign</Form.Label>


          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label className="fw-semibold small">Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" />
          </Form.Group>

          {/* Due Date */}
          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label className="fw-semibold small">Due</Form.Label>
            <Form.Control type="datetime-local" defaultValue={dueDate} />
          </Form.Group>

     
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-semibold small">Available from</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control type="datetime-local" defaultValue={availableDate} />
              <span className="align-self-center">Until</span>
              <Form.Control type="datetime-local" />
            </div>
          </Form.Group>
        </Form.Group>

    
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
=======
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        {/* Complete on your own */}

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-group">Assignment Group</label>
  </td>
  <td>
    <select id="wd-group">
      <option>ASSIGNMENTS</option>
      <option>EXAMS</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-display-grade-as">Display Grade as</label>
  </td>
  <td>
    <select id="wd-display-grade-as">
      <option>Percentage</option>
      <option>Points</option>
      <option>Letter</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-submission-type">Submission Type</label>
  </td>
  <td>
    <select id="wd-submission-type">
      <option>Online</option>
      <option>On Paper</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">Online Entry Options</td>
  <td>
    <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br/>
    <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br/>
    <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
    <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
    <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Uploads</label>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-assign-to">Assign to</label>
  </td>
  <td>
    <input id="wd-assign-to" defaultValue="Everyone" />
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-due-date">Due</label>
  </td>
  <td>
    <input id="wd-due-date" type="date" />
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-available-from">Available from</label>
  </td>
  <td>
    <input id="wd-available-from" type="date" /> Until <input id="wd-available-until" type="date" />
  </td>
</tr>



      </table>
    </div>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
