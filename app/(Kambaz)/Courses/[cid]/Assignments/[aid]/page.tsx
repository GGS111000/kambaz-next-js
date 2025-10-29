/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
// import Link from "next/link"; // 未使用，移除
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateAssignment, deleteAssignment } from "../../Assignments/reducer";
import { FaTrash } from "react-icons/fa";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();
  const router = useRouter();

  // 兼容：state.assignments 或 state.assignmentsReducer
  const assignment = useSelector((state: any) =>
    (state.assignments ?? state.assignmentsReducer)?.assignments?.find(
      (a: any) => a._id === aid
    )
  );

  // 初始化表单
  const [form, setForm] = useState({
    title: assignment?.title || "",
    description:
      assignment?.description ||
      "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kambaz application\n• Links to all relevant source code repositories\n\nThe Kambaz application should include a link to navigate back to the landing page.",
    points: assignment?.points ?? 100,
    due: assignment?.due || "2025-05-13T23:59",
    availableFrom: assignment?.availableFrom || "2025-05-06T00:00",
    availableUntil: assignment?.availableUntil || "",
  });

  // 如果异步或切换 aid 后拿到 assignment，回填一次
  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title ?? "",
        description: assignment.description ?? "",
        points: assignment.points ?? 100,
        due: assignment.due ?? "2025-05-13T23:59",
        availableFrom: assignment.availableFrom ?? "2025-05-06T00:00",
        availableUntil: assignment.availableUntil ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignment, aid]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 统一用表单提交事件，阻止默认提交，避免卡住
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateAssignment({ _id: aid, course: cid, ...form }));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    // 不触发表单提交，直接跳转
    router.push(`/Courses/${cid}/Assignments`);
  };

  // 删除相关逻辑
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDelete = () => {
    dispatch(deleteAssignment(aid));
    setShowConfirm(false);
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-4" id="wd-assignments-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-danger">{form.title || "Assignment"}</h3>
        <FaTrash
          className="text-danger cursor-pointer"
          role="button"
          onClick={() => setShowConfirm(true)}
          title="Delete assignment"
        />
      </div>
      <hr />

      {/* ✅ 用 onSubmit 管理 Save，阻止默认提交 */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ whiteSpace: "pre-line" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={form.points}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 border rounded p-3">
          <Form.Label className="fw-semibold mb-2">Assign</Form.Label>

          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label className="fw-semibold small">Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label className="fw-semibold small">Due</Form.Label>
            <Form.Control
              type="datetime-local"
              name="due"
              value={form.due}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-semibold small">Available from</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="datetime-local"
                name="availableFrom"
                value={form.availableFrom}
                onChange={handleChange}
              />
              <span className="align-self-center">Until</span>
              <Form.Control
                type="datetime-local"
                name="availableUntil"
                value={form.availableUntil}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Form.Group>

        <div className="mt-4 text-end">
          {/* ❗ Cancel 必须是 type="button" 才不会提交表单 */}
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>

          {/* ❗ Save 用 type="submit"，走 onSubmit */}
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </Form>

      {/* 删除确认弹窗 */}
      {showConfirm && (
        <div
          className="position-absolute bg-white border rounded p-4 shadow"
          style={{
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            minWidth: "300px",
          }}
        >
          <p>
            Are you sure you want to delete <strong>{form.title}</strong>?
          </p>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
