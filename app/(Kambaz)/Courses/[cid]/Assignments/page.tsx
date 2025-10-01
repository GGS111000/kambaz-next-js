"use client";

import { FaSearch, FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Card, Button, Form } from "react-bootstrap";
import Link from "next/link";
import GreenCheckmark from "../Modules/GreenCheckmark";  // ✅ 你的组件

export default function Assignments() {
  const assignments = [
    { id: "A1", module: "Multiple Modules", due: "Due May 13 at 11:59pm", pts: "100 pts" },
    { id: "A2", module: "Multiple Modules", due: "Due May 20 at 11:59pm", pts: "100 pts" },
    { id: "A3", module: "Multiple Modules", due: "Due May 27 at 11:59pm", pts: "100 pts" },
  ];

  return (
    <div className="container mt-3">
      <h2 className="fw-bold">ASSIGNMENTS</h2>
      <hr />

      {/* Search bar + Buttons */}
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

      {/* Assignments list */}
      <Card className="mb-2">
        <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
          <span>ASSIGNMENTS</span>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">40% of Total</span>
            <FaPlus className="me-3 text-muted" />
            <IoEllipsisVertical className="fs-4 text-muted" />
          </div>
        </Card.Header>

        {assignments.map((a) => (
          <div
            key={a.id}
            className="d-flex align-items-center border-top p-3"
            style={{ borderLeft: "5px solid green" }}
          >
            <div className="flex-grow-1">
              {/* ✅ 点击跳转到 AssignmentEditor */}
              <Link
                href={`./Assignments/${a.id}`}
                className="fw-bold text-decoration-none text-dark"
              >
                {a.id}
              </Link>
              <p className="mb-0 text-muted small">
                {a.module} | {a.due} | {a.pts}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-muted ms-2" />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
