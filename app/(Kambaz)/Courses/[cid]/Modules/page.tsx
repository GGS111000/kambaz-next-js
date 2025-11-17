/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, FormControl } from "react-bootstrap";

import { RootState } from "../../../store";
import {
  setModules,
  addModule,
  deleteModule as deleteModuleLocal,
  updateModuleLocal,
  editModule,
} from "./../Modules/reducer";
import * as coursesClient from "../../client";

export default function ModulesPage() {
  const params = useParams();
  const cid = params?.cid as string;

  const dispatch = useDispatch();
  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer
  );

  const [moduleName, setModuleName] = useState("");

  const fetchModules = async () => {
    if (!cid) return;
    const data = await coursesClient.findModulesForCourse(cid);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = { name: moduleName };
    const created = await coursesClient.createModuleForCourse(
      cid,
      newModule
    );
    dispatch(addModule(created));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await coursesClient.deleteModule(moduleId);
    dispatch(deleteModuleLocal(moduleId));
  };

  const onUpdateModule = async (module: any) => {
    await coursesClient.updateModule(module);
    dispatch(updateModuleLocal({ ...module, editing: false }));
  };

  return (
    <div className="container mt-3">
      <h3>Modules</h3>

      <div className="d-flex mb-2">
        <FormControl
          className="me-2"
          placeholder="New module name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={onCreateModuleForCourse}
        >
          Add
        </button>
      </div>

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroup.Item key={module._id} className="d-flex justify-content-between align-items-center">
            <div>
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="d-inline-block w-50"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(
                      updateModuleLocal({
                        ...module,
                        name: e.target.value,
                      })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule(module);
                    }
                  }}
                />
              )}
            </div>

            <div className="btn-group">
              {!module.editing && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(editModule(module._id))}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onRemoveModule(module._id)}
              >
                🗑
              </button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
