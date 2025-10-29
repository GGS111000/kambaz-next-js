/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useParams } from "next/navigation";
// import * as db from "../../../Database";
// import { useState } from "react";

// import { ListGroup, ListGroupItem } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import ModulesControls from "./ModulesControls";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";

// export default function Modules() {
//   const { cid } = useParams<{ cid: string }>();
//   // const modules = db.modules;
// const [modules, setModules] = useState<any[]>(db.modules);
//   if (!cid) return null; 

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const courseModules = modules.filter((m: any) => m.course === cid);

//   return (
//     <div className="p-3">

//       <ModulesControls />
//       <br />
//       <br />
//       <br />
//       <br />

     
//       <ListGroup className="rounded-0" id="wd-modules">
//         {courseModules.length === 0 ? (
//           <p className="text-muted ps-2">
//             No modules found for this course.
//           </p>
//         ) : (
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           courseModules.map((module: any) => (
//             <ListGroupItem
//               key={module._id}
//               className="wd-module p-0 mb-5 fs-5 border-gray"
//             >
         
//               <div className="wd-title p-3 ps-2 bg-secondary text-white">
//                 <BsGripVertical className="me-2 fs-3" />
//                 {module.name}
//                 <ModuleControlButtons />
//               </div>

      
//               {module.description && (
//                 <div className="ps-4 py-2 text-muted small border-bottom">
//                   {module.description}
//                 </div>
//               )}

         
//               {module.lessons && (
//                 <ListGroup className="wd-lessons rounded-0">
//                   {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
//                   {module.lessons.map((lesson: any) => (
//                     <ListGroupItem
//                       key={lesson._id}
//                       className="wd-lesson p-3 ps-4"
//                     >
//                       <BsGripVertical className="me-2 fs-3 text-secondary" />
//                       {lesson.name}
//                       <LessonControlButtons />
//                       {lesson.description && (
//                         <div className="text-muted small ps-4">
//                           {lesson.description}
//                         </div>
//                       )}
//                     </ListGroupItem>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroupItem>
//           ))
//         )}
//       </ListGroup>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((m: any) => m.course === cid)
          .map((module: any) => (
            <ListGroup.Item key={module._id} className="rounded-0">
              <div className="wd-title p-3 ps-2 bg-secondary text-white">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
