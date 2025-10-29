"use client";

import { FaSearch, FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Card, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import GreenCheckmark from "../Modules/GreenCheckmark";
import * as db from "../../../Database"; 

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = db.assignments || [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div className="container mt-3">
      <h2 className="fw-bold text-danger">ASSIGNMENTS</h2>
      <hr />

     
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center w-50">
          <FaSearch className="me-2 text-muted" />
          <Form.Control
            type="text"
            placeholder="Search for Assignment"
            className="flex-grow-1"
          />
        </div>
        <div>
          <Button variant="light" className="me-2 border">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>


      <Card className="mb-2 shadow-sm border-0">
        <Card.Header className="fw-bold d-flex justify-content-between align-items-center bg-light">
          <span>ASSIGNMENTS</span>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2 small">40% of Total</span>
            <FaPlus className="me-3 text-muted" />
            <IoEllipsisVertical className="fs-4 text-muted" />
          </div>
        </Card.Header>

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
        {courseAssignments.map((a: any) => (
          <div
            key={a._id}
            className="d-flex align-items-center border-top p-3"
            style={{ borderLeft: "5px solid green" }}
          >
            <div className="flex-grow-1">
              <Link
                href={`/Courses/${cid}/Assignments/${a._id}`}
                className="fw-bold text-decoration-none text-dark"
              >
                {a.title}
              </Link>
              <p className="mb-0 text-muted small">
                Multiple Modules | Due: TBD | 100 pts
              </p>

<Link href={`/Courses/${cid}/Assignments/AssignmentEditor`}>
  <Button variant="danger">+ Assignment</Button>
</Link>



            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-muted ms-2" />
            </div>
          </div>
        ))}

     
        {courseAssignments.length === 0 && (
          <div className="p-3 text-muted small">No assignments found.</div>
        )}
      </Card>
    </div>
  );
}
