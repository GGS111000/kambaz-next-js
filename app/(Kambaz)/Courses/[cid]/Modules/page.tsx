/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  type Module,
} from "../Modules"; // ← 统一入口（避免实例分叉）
import { BsGripVertical } from "react-icons/bs";
import { FormControl } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";

// 本地ID生成（避免 uuid 依赖问题）
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function Modules() {
  const { cid } = useParams<{ cid: string }>() ?? { cid: "" };
  const dispatch = useDispatch();

  // 读取 Redux（兼容两种键名）
  const allFromRedux =
    (useSelector((s: any) => s?.modules?.modules) ??
      useSelector((s: any) => s?.modulesReducer?.modules) ??
      []) as Module[];

  // —— 本地兜底：如果 Redux 没跟上，先把新加/编辑的显示出来
  const [localAdds, setLocalAdds] = useState<Module[]>([]);
  const [localEdits, setLocalEdits] = useState<Record<string, Partial<Module>>>({});

  // 视图数据 = Redux 当前课程 + 本地新增（同 id 去重）+ 本地编辑覆盖
  const viewModules = useMemo(() => {
    const fromReduxThis = allFromRedux.filter((m) => String(m.course) === String(cid));
    // 合并本地新增（同 _id 去重）
    const map = new Map<string, Module>();
    for (const m of fromReduxThis) map.set(m._id, m);
    for (const m of localAdds.filter((x) => String(x.course) === String(cid))) {
      if (!map.has(m._id)) map.set(m._id, m);
    }
    // 应用本地编辑覆盖
    for (const [id, patch] of Object.entries(localEdits)) {
      if (map.has(id)) map.set(id, { ...map.get(id)!, ...patch });
    }
    return Array.from(map.values());
  }, [allFromRedux, localAdds, localEdits, cid]);

  // 顶部“快速新增”
  const [newName, setNewName] = useState("");

  const doAdd = () => {
    const n = newName.trim();
    if (!n) return;
    const temp: Module = {
      _id: genId(),
      name: n,
      course: String(cid),
      lessons: [],
      editing: false,
    };
    // 先本地展示
    setLocalAdds((prev) => [temp, ...prev]);
    // 触发 Redux
    dispatch(addModule({ name: n, course: String(cid) }));
    setNewName("");
  };

  const doEditEnter = (m: Module) => {
    // 行内开启编辑（先本地体现，防止看不到编辑状态）
    setLocalEdits((p) => ({ ...p, [m._id]: { editing: true } }));
    dispatch(editModule(m._id));
  };

  const doEditUpdate = (m: Module, name: string) => {
    // 本地即时更新
    setLocalEdits((p) => ({ ...p, [m._id]: { name } }));
    // Redux 更新
    dispatch(updateModule({ ...m, name }));
  };

  const doEditExit = (m: Module) => {
    setLocalEdits((p) => ({ ...p, [m._id]: { ...(p[m._id] ?? {}), editing: false } }));
    dispatch(updateModule({ ...m, editing: false }));
  };

  const doDelete = (id: string) => {
    setLocalAdds((prev) => prev.filter((x) => x._id !== id));
    setLocalEdits((p) => {
      const copy = { ...p };
      delete copy[id];
      return copy;
    });
    dispatch(deleteModule(id));
  };

  // —— 调试：看 Redux 是否在变（交作业前可删除）
  const debugAll = allFromRedux.length;
  const debugView = viewModules.filter((m) => String(m.course) === String(cid)).length;

  return (
    <div className="wd-modules p-2">
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

        <span className="ms-3 text-muted small">
          reduxAll:{debugAll} | viewThis:{debugView} | cid:{String(cid)}
        </span>
      </div>

      {viewModules
        .filter((m) => String(m.course) === String(cid))
        .map((module) => {
          const editing =
            (module as any).editing ??
            (localEdits[module._id]?.editing ?? false);
          const displayName =
            localEdits[module._id]?.name ?? module.name;

          return (
            <div key={module._id} className="wd-title p-3 ps-2 bg-secondary mb-2">
              <BsGripVertical className="me-2 fs-3" />

              {!editing && <span>{displayName}</span>}
              {editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  autoFocus
                  defaultValue={displayName}
                  onChange={(e) => doEditUpdate(module, (e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => e.key === "Enter" && doEditExit(module)}
                  onBlur={() => doEditExit(module)}
                />
              )}

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={doDelete}
                editModule={() => doEditEnter(module)}
              />
            </div>
          );
        })}

      {!viewModules.filter((m) => String(m.course) === String(cid)).length && (
        <div className="text-muted fst-italic">No modules yet. Add one ↑</div>
      )}
    </div>
  );
}
