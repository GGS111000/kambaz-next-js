<<<<<<< HEAD
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account/Signin", label: "Signin" },
    { href: "/Account/Signup", label: "Signup" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <div
      id="wd-account-navigation"
      className="d-flex flex-column bg-light vh-100 p-3"
      style={{ width: 200 }}
    >
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`d-flex align-items-center mb-3 text-decoration-none fw-bold ${
              isActive ? "text-dark" : "text-danger"
            }`}
          >
            {/* 左侧黑色短 bar */}
            <div
              style={{
                width: "5px",
                height: "20px",
                backgroundColor: isActive ? "black" : "transparent",
                marginRight: "8px",
              }}
            />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
=======
import Link from "next/link";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation">
     <Link href="/Account/Signin"> Signin </Link> <br />
     <Link href="/Account/Signup"> Signup </Link> <br />
     <Link href="/Account/Profile"> Profile </Link> <br />
   </div>
);}
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
