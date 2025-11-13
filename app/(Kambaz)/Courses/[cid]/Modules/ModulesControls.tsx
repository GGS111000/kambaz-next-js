/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  addModule,
}: {
  addModule: (name: string) => void;
}) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const onAdd = () => {
    const n = name.trim();
    if (!n) return;
    addModule(n);
    setName("");
    setShow(false);
  };

  return (
    <div className="d-flex justify-content-between mb-3">
      <div className="d-flex align-items-center gap-2">
        <h3 className="mb-0">Modules</h3>
      </div>

      <div className="d-flex align-items-center gap-2">
        <Button variant="danger" onClick={() => setShow(true)}>
          Module
        </Button>
      </div>

      {/* 弹窗：新增 Module */}
      <ModuleEditor
        show={show}
        title="Add Module"
        name={name}
        setName={setName}
        onCancel={() => {
          setName("");
          setShow(false);
        }}
        onSave={onAdd}
        saveText="Add Module"
      />
    </div>
  );
}
