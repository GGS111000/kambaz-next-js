"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";  // ★ 你的 store.ts 路径

export default function AccountNavigation() {
  const pathname = usePathname();

  // ★ 从 Redux 拿 currentUser（课件要求）
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const links = [
    { href: "/Account/Signin", label: "Signin" },
    { href: "/Account/Signup", label: "Signup" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <Nav
      variant="pills"
      className="d-flex flex-column bg-light vh-100 p-3"
      style={{ width: 200 }}
    >
      {links.map((link) => (
        <NavItem key={link.href} className="mb-2">
          <NavLink
            as={Link}
            href={link.href}
            active={pathname.startsWith(link.href)}
            className="fw-bold"
          >
            {link.label}
          </NavLink>
        </NavItem>
      ))}

      {/* ★★★ 关键新增：只有 ADMIN 才显示 Users 连结 ★★★ */}
      {currentUser && currentUser.role === "ADMIN" && (
        <NavItem className="mb-2">
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.endsWith("Users")}
            className="fw-bold"
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
