"use client";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setTodo, deleteTodo as deleteTodoAction } from "./todosReducer";
import type { Todo } from "./todosReducer";

// 允许 todo 为可选，渲染前兜底
type Props = { todo?: Todo };

export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();

  // 兜底：若传进来是 undefined，直接不渲染（也可返回一个占位）
  if (!todo) return null;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>{todo.title ?? ""}</span>
      <div className="d-flex gap-2">
        <Button
          variant="outline-danger"
          id="wd-delete-todo-click"
          onClick={() => dispatch(deleteTodoAction(todo.id))}
        >
          Delete
        </Button>
        <Button
          variant="outline-secondary"
          id="wd-set-todo-click"
          onClick={() => dispatch(setTodo(todo))}
        >
          Edit
        </Button>
      </div>
    </ListGroup.Item>
  );
}
