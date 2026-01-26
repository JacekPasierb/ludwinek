import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const links = [
    {href: "/admin", label: "Ustawienia strony"},
    {href: "/admin/relations", label: "Relacje"},
    {href: "/admin/chatbot", label: "Chatbot"},
  ];
  return (
    <>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={pathname === l.href ? "active" : ""}
        >
          {l.label}
        </Link>
      ))}
    </>
  );
}
