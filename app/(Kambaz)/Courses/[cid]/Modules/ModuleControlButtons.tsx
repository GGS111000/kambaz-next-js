// // "use client";

// // import React from "react";
// // import { IoEllipsisVertical } from "react-icons/io5";
// // import GreenCheckmark from "./GreenCheckmark";
// // export default function ModuleControlButtons() {
// //   return (
// //     <div className="float-end">
// //       <GreenCheckmark />
// //       <IoEllipsisVertical className="fs-4" />
// //     </div> );}

// "use client";
// import { useState } from "react";
// import { Button } from "react-bootstrap";
// import { FaPlus } from "react-icons/fa6";
// import ModuleEditor from "./ModuleEditor";

// export default function ModulesControls({
//   moduleName,
//   setModuleName,
//   addModule,
// }: {
//   moduleName: string;
//   setModuleName: (title: string) => void;
//   addModule: () => void;
// }) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div id="wd-modules-controls" className="text-nowrap mb-2">
//       <Button variant="danger" onClick={handleShow}>
//         <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
//         Module
//       </Button>
//       <ModuleEditor
//         show={show}
//         handleClose={handleClose}
//         dialogTitle="Add Module"
//         moduleName={moduleName}
//         setModuleName={setModuleName}
//         addModule={addModule}
//       />
//     </div>
//   );
// }

"use client";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

// 占位：如果你项目已有 GreenCheckmark 组件，请改为真实 import
function GreenCheckmark() {
  return <span className="text-success ms-2">✔</span>;
}

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
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
      <GreenCheckmark />
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

