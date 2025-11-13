/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { addAssignment, deleteAssignment } from "../../Courses/[cid]/Assignments/reducer";
import { addModule, deleteModule } from "../../Courses/[cid]/Modules/reducer";
import { enroll, unenroll } from "../../Enrollments/EnrollmentReducer";

export default function StoreDebug() {
  const state = useSelector((s: any) => s);
  const dispatch = useDispatch();

  const assignments = state.assignments?.assignments ?? state.assignmentsReducer?.assignments ?? [];
  const modules = state.modulesReducer?.modules ?? [];
  const enrollments = state.enrollmentReducer?.enrollments ?? [];
  const currentUser = state.accountReducer?.currentUser ?? null;

  const sampleAddAssignment = () => {
    const cid = "RS101";
    const payload = { title: "API-added", description: "Added from StoreDebug", points: 10, course: cid };
    console.debug('StoreDebug: dispatching addAssignment', payload);
    dispatch(addAssignment(payload));
  };

  const sampleDeleteLastAssignment = () => {
    const last = assignments[assignments.length - 1];
    if (!last) return;
    console.debug('StoreDebug: dispatching deleteAssignment', last._id);
    dispatch(deleteAssignment(last._id));
  };

  const sampleEnroll = () => {
    if (!currentUser) return alert('Sign in first (use Account > Sign in)');
    dispatch(enroll({ userId: currentUser._id, courseId: 'RS101' }));
  };

  const sampleUnenroll = () => {
    if (!currentUser) return alert('Sign in first (use Account > Sign in)');
    dispatch(unenroll({ userId: currentUser._id, courseId: 'RS101' }));
  };

  return (
    <div className="container mt-4">
      <h2>Store Debug</h2>
      <p>Current user: {currentUser ? `${currentUser.username} (${currentUser._id})` : 'Not signed in'}</p>

      <div className="mb-3">
        <h4>Assignments ({assignments.length})</h4>
        <button className="btn btn-danger me-2" onClick={sampleAddAssignment}>Add sample assignment</button>
        <button className="btn btn-secondary" onClick={sampleDeleteLastAssignment}>Delete last assignment</button>
        <ul className="mt-2">
          {assignments.map((a: any) => (
            <li key={a._id}>{a._id} — {a.title}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h4>Modules ({modules.length})</h4>
        <button className="btn btn-danger me-2" onClick={() => dispatch(addModule({ name: 'API Module', course: 'RS101' }))}>Add sample module</button>
        <button className="btn btn-secondary" onClick={() => { const last = modules[modules.length - 1]; if (last) dispatch(deleteModule(last._id)); }}>Delete last module</button>
        <ul className="mt-2">
          {modules.map((m: any) => (
            <li key={m._id}>{m._id} — {m.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h4>Enrollments ({enrollments.length})</h4>
        <button className="btn btn-danger me-2" onClick={sampleEnroll}>Enroll me in RS101</button>
        <button className="btn btn-secondary" onClick={sampleUnenroll}>Unenroll me from RS101</button>
        <ul className="mt-2">
          {enrollments.map((e: any) => (
            <li key={e._id}>{e._id} — user:{e.user} course:{e.course}</li>
          ))}
        </ul>
      </div>

      <div>
        <Link href="/Dashboard"><button className="btn btn-primary">Back to Dashboard</button></Link>
      </div>

    </div>
  );
}
