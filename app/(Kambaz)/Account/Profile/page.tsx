"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4 text-center">Profile</h1>

      <Form>
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control type="text" defaultValue="alice" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control type="password" defaultValue="123" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-firstname">
          <Form.Control type="text" defaultValue="Alice" placeholder="First Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-lastname">
          <Form.Control type="text" defaultValue="Wonderland" placeholder="Last Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-dob">
          <Form.Control type="date" defaultValue="2000-01-01" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-email">
          <Form.Control type="email" defaultValue="alice@wonderland" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-role">
          <Form.Select defaultValue="FACULTY">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
         
          <Link href="/Account/Signin" className="btn btn-danger">
            Sign out
          </Link>
        </div>
      </Form>
    </div>
  );
}
