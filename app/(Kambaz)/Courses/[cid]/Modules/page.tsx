"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import * as client from "../../client";

import {
  setModules,
  editModule,
  updateModule as updateModuleState,
  deleteModule as deleteModuleState,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer
  );

  const [moduleName, setModuleName] = useState("");

  const fetchModules = async () => {
    const data = await client.findModulesForCourse(cid as string);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModule = async () => {
    const newModule = {
      name: moduleName,
      course: cid,
    };
    const module = await client.createModuleForCourse(
      cid as string,
      newModule
    );
    dispatch(setModules([...modules, module]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    dispatch(
      setModules(
        modules.map((m: any) => (m._id === module._id ? module : m))
      )
    );
  };

  return (
    <div className="container mt-3">
      <h3>Modules</h3>

      <input
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New module name"
        className="form-control mb-2"
      />

      <button className="btn btn-primary mb-3" onClick={onCreateModule}>
        Add Module
      </button>

      <ul className="list-group">
        {modules.map((module: any) => (
          <li key={module._id} className="list-group-item">
            {!module.editing && (
              <>
                {module.name}
                <button
                  className="btn btn-sm btn-warning float-end ms-2"
                  onClick={() => dispatch(editModule(module._id))}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger float-end"
                  onClick={() => onRemoveModule(module._id)}
                >
                  Delete
                </button>
              </>
            )}

            {module.editing && (
              <input
                value={module.name}
                className="form-control"
                onChange={(e) =>
                  dispatch(
                    updateModuleState({
                      ...module,
                      name: e.target.value,
                    })
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateModule({ ...module, editing: false });
                  }
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
