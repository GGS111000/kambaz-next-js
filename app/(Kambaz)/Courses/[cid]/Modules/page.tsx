"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";
import ModuleControlButtons from "./ModuleControlButtons";

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  // 从 Redux 中读取所有模块
  const modules = useSelector((state: any) =>
    state.modulesReducer?.modules ?? state.modules?.modules ?? []
  );
 console.log("Current modules:", modules);
  // 过滤当前课程的模块
  const courseModules = modules.filter(
    (m: any) => String(m.course) === String(cid)
  );

  // 添加模块输入框状态
  const handleAdd = () => {
    const name = prompt("Enter module name:");
    if (name) {
      dispatch(addModule({ name, course: cid }));
    }
  };

  return (
    <div id="wd-modules" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Modules</h3>
        <Button variant="danger" onClick={handleAdd}>
          + Add Module
        </Button>
      </div>

      {courseModules.map((module: any) => (
        <div
          key={module._id}
          className="wd-title p-3 ps-2 bg-secondary text-white mb-2 rounded"
        >
          <BsGripVertical className="me-2 fs-4" />
          {module.editing ? (
            <FormControl
              className="d-inline-block w-50"
              autoFocus
              defaultValue={module.name}
              onChange={(e) =>
                dispatch(updateModule({ ...module, name: e.target.value }))
              }
              onBlur={() =>
                dispatch(updateModule({ ...module, editing: false }))
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                dispatch(updateModule({ ...module, editing: false }))
              }
            />
          ) : (
            <span>{module.name}</span>
          )}

          <ModuleControlButtons
            moduleId={module._id}
            deleteModule={(id) => dispatch(deleteModule(id))}
            editModule={(id) => dispatch(editModule(id))}
          />
        </div>
      ))}
    </div>
  );
}
