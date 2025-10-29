"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addAssignment } from "@/app/(Kambaz)/Courses/Assignments/reducer";
import { v4 as uuidv4 } from "uuid";
import { Button, Form } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState({
    _id: uuidv4(),
    name: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSave = () => {
    dispatch(addAssignment(assignment));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-3">
      <h2>New Assignment</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={assignment.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={assignment.description} onChange={handleChange} as="textarea" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control name="points" type="number" value={assignment.points} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control name="due" type="datetime-local" value={assignment.due} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control name="availableFrom" type="datetime-local" value={assignment.availableFrom} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control name="availableUntil"
