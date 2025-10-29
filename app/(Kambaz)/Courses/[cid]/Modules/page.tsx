/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule as addModuleAction,
  editModule as editModuleAction,
  updateModule as updateModuleAction,
  deleteModule as deleteModuleAction,
} from "./reducer";
 
import { BsGripVertical } from "react-icons/bs";
import { FormControl } from "react-bootstrap";
 
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
 
export default function Modules() {
  const { cid } = useParams<{ cid: string }>() ?? { cid: "" };
 
  // only for the “new module name” input
  const [moduleName, setModuleName] = useState("");
 
  // pull modules from Redux
  //const modules = useSelector((state: any) => state.modulesReducer.modules);

  const modules =

  useSelector((state: any) => state?.modulesReducer?.modules) ?? [];
 
  const dispatch = useDispatch();
 
  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          const name = moduleName.trim();
          if (!name) return;
          dispatch(addModuleAction({ name, course: String(cid) }));
          setModuleName("");
        }}
      />
 
      {modules?.map((module: any) => (
        <div key={module._id} className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          {!module.editing && module.name}
 
          {module.editing && (
            <FormControl
              className="w-50 d-inline-block"
              defaultValue={module.name}
              onChange={(e) =>
                dispatch(
                  updateModuleAction({
                    ...module,
                    name: (e.target as HTMLInputElement).value,
                  })
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    updateModuleAction({
                      ...module,
                      editing: false,
                    })
                  );
                }
              }}
            />
          )}
 
          <ModuleControlButtons
            moduleId={module._id}
            deleteModule={(moduleId: string) =>
              dispatch(deleteModuleAction(moduleId))
            }
            editModule={(moduleId: string) =>
              dispatch(editModuleAction(moduleId))
            }
          />
        </div>
      ))}
    </div>
  );
}