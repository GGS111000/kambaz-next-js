"use client";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        className="text-warning me-3 mb-1"
        role="button"
        title="Edit module"
        onClick={() => editModule(moduleId)}
      />
      <FaTrash
        className="text-danger me-3 mb-1"
        role="button"
        title="Delete module"
        onClick={() => deleteModule(moduleId)}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
