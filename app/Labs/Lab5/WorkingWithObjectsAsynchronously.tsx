/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const res = await client.fetchAssignment();
    setAssignment(res);
  };

  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working With Objects Asynchronously</h3>
      <h4>Assignment</h4>

      <Form.Control
        defaultValue={assignment.title}
        className="mb-2"
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      <Form.Control
        as="textarea"
        rows={3}
        defaultValue={assignment.description}
        className="mb-2"
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />

      <button className="btn btn-primary" onClick={() => updateTitle(assignment.title)}>
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
