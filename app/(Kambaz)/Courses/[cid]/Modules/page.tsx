/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/(Kambaz)/store";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  type Module,
} from "../Modules"; // 统一入口，避免实例分叉
import { BsGripVertical } from "react-icons/bs";
import { FormControl } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>() ?? { cid: "" };
  const dispatch = useDispatch();

  // ✅ 无条件调用两个 selector（分别读取主键与别名）
  const fromAlias = useSelector((s: RootState) => s.modules?.modules);
  const fromReducer = useSelector((s: RootState) => s.modulesReducer?.modules);

  // ✅ 合并逻辑放进 useMemo，依赖明确稳定
  const allModules = useMemo<Module[]>(
    () => (fromAlias ?? fromReducer ?? []) as Module[],
    [fromAlias, fromReducer]
  );

  // ✅ 只显示当前课程
  const modules = useMemo(
    () => allModules.filter((m) => String(m.course) === String(cid)),
    [allModules, cid]
  );

  // 顶部“快速新增”（保底可用，不依赖弹窗）
  const [newName, setNewName] = useState("");

  const doAdd = () => {
    const n = newName.trim();
    if (!n) return;
    dispatch(addModule({ name: n, course: String(cid) }));
    setNewName("");
  };

  return (
    <div className="wd-modules p-2">
      {/* 顶部：快速新增 */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <h3 className="mb-0">Modules</h3>
        <input
          className="form-control w-auto"
          placeholder="e.g., Week 1: Intro"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doAdd()}
        />
        <button className="btn btn-danger" onClick={doAdd}>
          Add
        </button>
      </div>

      {/* 列表 */}
      {modules.map((module) => {
        const editing = (module as any).editing ?? false;
        return (
          <div key={module._id} className="wd-title p-3 ps-2 bg-secondary mb-2">
            <BsGripVertical className="me-2 fs-3" />

            {!editing && <span>{module.name}</span>}
            {editing && (
              <FormControl
                className="w-50 d-inline-block"
                autoFocus
                defaultValue={module.name}
                onChange={(e) =>
                  dispatch(
                    updateModule({
                      ...module,
                      name: (e.target as HTMLInputElement).value,
                    })
                  )
                }
                onKeyDown={(e) => e.key === "Enter" && dispatch(updateModule({ ...module, editing: false }))}
                onBlur={() => dispatch(updateModule({ ...module, editing: false }))}
              />
            )}

            <ModuleControlButtons
              moduleId={module._id}
              deleteModule={(id: string) => dispatch(deleteModule(id))}
              editModule={() => dispatch(editModule(module._id))}
            />
          </div>
        );
      })}

      {!modules.length && (
        <div className="text-muted fst-italic">No modules yet. Add one ↑</div>
      )}
    </div>
  );
}
