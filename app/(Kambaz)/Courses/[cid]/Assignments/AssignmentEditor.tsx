/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addAssignment } from "../Assignments/reducer";
import { Form } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    // Let the reducer generate the _id
    const payload = { ...form, course: cid };
    console.debug("AssignmentEditor: dispatching addAssignment", payload);
    dispatch(addAssignment(payload));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-3">
      <h2 className="fw-bold text-danger mb-3">New Assignment</h2>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={form.description} onChange={handleChange} as="textarea" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control name="points" type="number" value={form.points} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control name="due" type="datetime-local" value={form.due} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control name="availableFrom" type="datetime-local" value={form.availableFrom} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control name="availableUntil" type="datetime-local" value={form.availableUntil} onChange={handleChange} />
        </Form.Group>

        <div className="text-end">
          <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
