/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  editAssignment,
  type Assignment,
} from "../Assignments"; // ← 统一入口，避免实例分叉
import { FormControl } from "react-bootstrap";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>() ?? { cid: "" };
  const router = useRouter();
  const dispatch = useDispatch();

  // 兼容两种键名（store 里也有别名）
  const all =
    (useSelector((s: any) => s?.assignments?.assignments) ??
      useSelector((s: any) => s?.assignmentsReducer?.assignments) ??
      []) as Assignment[];

  // 只显示当前课程
  const list = useMemo(
    () => all.filter((a) => String(a.course) === String(cid)),
    [all, cid]
  );

  // 顶部“快速新增”（保底可用）
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState<number | "">("");
  const [due, setDue] = useState("");

  const doAdd = () => {
    const t = title.trim();
    if (!t) return;
    dispatch(
      addAssignment({
        course: String(cid),
        title: t,
        points: points === "" ? undefined : Number(points),
        due: due || undefined,
      })
    );
    setTitle("");
    setPoints("");
    setDue("");
  };

  return (
    <div className="p-2">
      {/* 顶部：快速新增（不依赖弹窗，保证能看到变化） */}
      <div className="d-flex align-items-end gap-2 mb-3">
        <div>
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="e.g., A1: HTML"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doAdd()}
          />
        </div>
        <div>
          <label className="form-label">Points</label>
          <input
            className="form-control"
            type="number"
            placeholder="100"
            value={points}
            onChange={(e) =>
              setPoints(e.target.value === "" ? "" : Number(e.target.value))
            }
            onKeyDown={(e) => e.key === "Enter" && doAdd()}
          />
        </div>
        <div>
          <label className="form-label">Due</label>
          <input
            className="form-control"
            type="datetime-local"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doAdd()}
          />
        </div>
        <button className="btn btn-danger mb-1" onClick={doAdd}>
          Add Assignment
        </button>
      </div>

      {/* 列表 */}
      {!list.length && (
        <div className="text-muted fst-italic mb-2">
          No assignments yet. Add one ↑
        </div>
      )}

      {list.map((a) => {
        const editing = a.editing ?? false;
        return (
          <div key={a._id} className="bg-light p-3 border rounded mb-2">
            {/* 标题（展示/行内编辑） */}
            <div className="mb-2">
              <label className="form-label fw-semibold">Title</label>
              {!editing ? (
                <div className="d-flex align-items-center justify-content-between">
                  <div>{a.title}</div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        router.push(`/Courses/${cid}/Assignments/${a._id}`)
                      }
                    >
                      Open
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => dispatch(editAssignment(a._id))}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(deleteAssignment(a._id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <FormControl
                  autoFocus
                  defaultValue={a.title}
                  onChange={(e) =>
                    dispatch(
                      updateAssignment({
                        ...a,
                        title: (e.target as HTMLInputElement).value,
                      })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(updateAssignment({ ...a, editing: false }));
                    }
                  }}
                  onBlur={() =>
                    dispatch(updateAssignment({ ...a, editing: false }))
                  }
                />
              )}
            </div>

            {/* 其他字段（可选） */}
            <div className="d-flex gap-4">
              <div>
                <label className="form-label">Points</label>
                <div>{a.points ?? 100}</div>
              </div>
              <div>
                <label className="form-label">Due</label>
                <div>{a.due ?? ""}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
