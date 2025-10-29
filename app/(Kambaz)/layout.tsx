<<<<<<< HEAD
//"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
export default function KambazLayout({
 children,
}: Readonly<{ children: ReactNode }>) {
 return (
   <Provider store={store}>
     <div className="d-flex" id="wd-kambaz">
       <div>
         <KambazNavigation />
       </div>
       <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
     </div>
   </Provider>
);}


=======
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td valign="top" width="200">  <KambazNavigation /> </td>
         <td valign="top" width="100%"> {children}           </td>
       </tr>
     </tbody>
   </table>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
