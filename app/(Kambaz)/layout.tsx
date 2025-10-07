import { ReactNode } from "react";
import KambazNavigation from "./Navigation";


export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
 
  <div className="d-flex">
    <div>
      <KambazNavigation />
       {children}
    </div>
  
</div>

);}


