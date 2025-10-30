/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import type { RootState } from "@/app/(Kambaz)/store";
import {
  updateAssignment,
  deleteAssignment,
  type Assignment,
} from "../../Assignments"; // 统一入口，避免实例分叉

export default function AssignmentEditorPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ 统一“无条件调用”：各取一遍，再在 useMemo 里合并
  const aFromAlias = useSelector((s: RootState) => s.assignments?.assignments);
  const aFromReducer = useSelector((s: RootState) => s.assignmentsReducer?.assignments);

  // ✅ 把 all 的“逻辑合并”放进 useMemo，依赖可控
  const all = useMemo<Assignment[]>(
    () => (aFromAlias ?? aFromReducer ?? []) as Assignment[],
    [aFromAlias, aFromReducer]
  );

  const assignment = useMemo(
    () => all.find((x) => x._id === aid),
    [all, aid]
  );

  // 若不存在，回列表
  useEffect(() => {
    if (!assignment) {
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [assignment, cid, router]);

  const [form, setForm] = useState({
    title: assignment?.title ?? "",
    description:
      assignment?.description ?? "Submit the link to your app landing page.",
    points: assignment?.points ?? 100,
    due: assignment?.due ?? "",
    availableFrom: assignment?.availableFrom ?? "",
    availableUntil: assignment?.availableUntil ?? "",
  });

  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title ?? "",
        description: assignment.description ?? "",
        points: assignment.points ?? 100,
        due: assignment.due ?? "",
        availableFrom: assignment.availableFrom ?? "",
        availableUntil: assignment.availableUntil ?? "",
      });
    }
  }, [assignment]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aid) return;
    dispatch(
      updateAssignment({
        _id: aid,
        course: String(cid),
        ...form,
        points: Number(form.points) || 0,
      } as Assignment)
    );
    router.push(`/Courses/${cid}/Assignments`);
  };

  const onDelete = () => {
    if (!aid) return;
    dispatch(deleteAssignment(aid));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const onCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!assignment) return null;

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <h3 className="fw-bold text-danger">{form.title || "Assignment"}</h3>
      <hr />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            name="description"
            value={form.description}
            onChange={onChange}
            style={{ whiteSpace: "pre-line" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={form.points}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 border rounded p-3">
          <Form.Label className="fw-semibold mb-2">Assign</Form.Label>
          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label className="fw-semibold small">Due</Form.Label>
            <Form.Control
              type="datetime-local"
              name="due"
              value={form.due}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-semibold small">Available from</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="datetime-local"
                name="availableFrom"
                value={form.availableFrom}
                onChange={onChange}
              />
              <span className="align-self-center">Until</span>
              <Form.Control
                type="datetime-local"
                name="availableUntil"
                value={form.availableUntil}
                onChange={onChange}
              />
            </div>
          </Form.Group>
        </Form.Group>

        <div className="mt-4 text-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
          <button type="button" className="btn btn-outline-danger ms-2" onClick={onDelete}>
            Delete
          </button>
        </div>
      </Form>
    </div>
  );
}
