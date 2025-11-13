/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Modal, Button, FormControl } from "react-bootstrap";

export default function ModuleEditor({
  show,
  title,
  name,
  setName,
  onSave,
  onCancel,
  saveText = "Save",
}: {
  show: boolean;
  title: string;
  name: string;
  setName: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saveText?: string;
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label">Module name</label>
        <FormControl
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
          }}
          placeholder="e.g., Week 1: Intro"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          {saveText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
