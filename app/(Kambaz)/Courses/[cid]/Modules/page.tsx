"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";


import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = db.modules;

  if (!cid) return null; 


  const courseModules = modules.filter((m: any) => m.course === cid);

  return (
    <div className="p-3">

      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

     
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.length === 0 ? (
          <p className="text-muted ps-2">
            No modules found for this course.
          </p>
        ) : (
          courseModules.map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
         
              <div className="wd-title p-3 ps-2 bg-secondary text-white">
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
                <ModuleControlButtons />
              </div>

      
              {module.description && (
                <div className="ps-4 py-2 text-muted small border-bottom">
                  {module.description}
                </div>
              )}

         
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-4"
                    >
                      <BsGripVertical className="me-2 fs-3 text-secondary" />
                      {lesson.name}
                      <LessonControlButtons />
                      {lesson.description && (
                        <div className="text-muted small ps-4">
                          {lesson.description}
                        </div>
                      )}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
