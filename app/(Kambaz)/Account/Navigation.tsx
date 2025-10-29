"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
 
export default function AccountNavigation() {
  const pathname = (usePathname() ?? "").toLowerCase();
 
  // ✅ don't destructure from possibly-undefined
  const currentUser =
    useSelector((state: any) => state?.accountReducer?.currentUser) ?? null;
 
  const items = currentUser
    ? [{ label: "Profile", href: "/Account/Profile" }]
    : [
        { label: "Signin", href: "/Account/Signin" },
        { label: "Signup", href: "/Account/Signup" },
      ];
 
  return (
<Nav variant="pills">
      {items.map(({ label, href }) => (
<NavItem key={label}>
<NavLink
            as={Link}
            href={href}
            active={pathname === href.toLowerCase()}
>
            {label}
</NavLink>
</NavItem>
      ))}
</Nav>
  );
}