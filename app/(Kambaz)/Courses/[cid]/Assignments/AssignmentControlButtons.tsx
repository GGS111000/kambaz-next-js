"use client";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AssignmentControlButtons({
  assignmentId,
  onEdit,
  onDelete,
}: {
  assignmentId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        className="text-warning me-3 mb-1"
        role="button"
        title="Edit assignment"
        onClick={() => onEdit(assignmentId)}
      />
      <FaTrash
        className="text-danger me-3 mb-1"
        role="button"
        title="Delete assignment"
        onClick={() => onDelete(assignmentId)}
      />
    </div>
  );
}
