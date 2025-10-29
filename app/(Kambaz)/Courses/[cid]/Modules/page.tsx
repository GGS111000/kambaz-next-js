// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";
// import { useParams } from "next/navigation";
// import * as db from "../../../Database";
// import { ListGroup, ListGroupItem } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import ModulesControls from "./ModulesControls";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";
// import { FaPencil } from "react-icons/fa6";
// export default function Modules() {
//   const { cid } = useParams<{ cid: string }>();
  
// const [modules, setModules] = useState<any[]>(db.modules);
  
//   const [moduleName, setModuleName] = useState("");
//   if (!cid) return null; 


//   const addModule = () => {
//     setModules([ ...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] } ]);
//     setModuleName("");
//   };
// const [moduleName, setModuleName] = useState("");
//   const addModule = () => {
//     setModules([ ...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] } ]);
//     setModuleName("");
//   };

//   const courseModules = modules.filter((m: any) => m.course === cid);
// const deleteModule = (moduleId: string) => {
//     setModules(modules.filter((m) => m._id !== moduleId));
//   };
//  const editModule = (moduleId: string) => {
//     setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
//   };
//   const updateModule = (module: any) => {
//     setModules(modules.map((m) => (m._id === module._id ? module : m)));
//   };

//   return (
//     <div className="p-3">

//       <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule}/>
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
  
//           courseModules.map((module: any) => (
//             <ListGroupItem
//               key={module._id}
//               className="wd-module p-0 mb-5 fs-5 border-gray"
//             >
         
//               <div className="wd-title p-3 ps-2 bg-secondary text-white">
//                 <BsGripVertical className="me-2 fs-3" />
//                 {module.name}
                
//                   moduleId={module._id}
//         deleteModule={deleteModule} /
//               </div>

      
//               {module.description && (
//                 <div className="ps-4 py-2 text-muted small border-bottom">
//                   {module.description}
//                 </div>
//               )}

         
//               {module.lessons && (
//                 <ListGroup className="wd-lessons rounded-0">
               
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


import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Modules() {
  const { cid } = useParams();
  const [ setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const addModule = () => { ... }
  const deleteModule = (moduleId: string) => { ... }
  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };
  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };
   const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();


  return (
 <div className="wd-modules">
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} />


    <div className="wd-title p-3 ps-2 bg-secondary">
      <BsGripVertical className="me-2 fs-3" />
      {!module.editing && module.name}
      { module.editing && (
        
<FormControl className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name} />
                )}
                <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />




      </div>
    </div>
  );
}

