"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({ id: "1", title: "" });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item by ID</h4>
      <a
        className="btn btn-primary float-end"
        id="wd-retrieve-todo-by-id"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <Form.Control
        className="w-50"
        id="wd-todo-id"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating new Items</h4>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h4>Removing from Array</h4>
      <a
        className="btn btn-danger float-end"
        id="wd-remove-todo"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo ID = {todo.id}
      </a>
      <Form.Control
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Updating an Item</h4>
      <Form.Control
        className="w-25 float-start me-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <Form.Control
        className="w-50 float-start"
        defaultValue={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo Title
      </a>

      <hr />
    </div>
  );
}
