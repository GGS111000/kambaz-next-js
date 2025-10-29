import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";

export default function DatabasePage() {
  return (
    <div className="container mt-3">
      <h2>Database Loaded</h2>
      <p>Courses: {courses.length}</p>
      <p>Modules: {modules.length}</p>
      <p>Assignments: {assignments.length}</p>
    </div>
  );
}


export { courses, modules, assignments };
