import Link from "next/link";
import {usePathname} from "next/navigation";
import {LuPencilLine, LuScrollText} from "react-icons/lu";
import {TbHomeBitcoin} from "react-icons/tb";
import styles from "../styles/nav-links.module.css";
import {BiArrowFromLeft, BiBot, BiTrophy} from "react-icons/bi";

const links = [
  {name: "STATYSTYKI", href: "/admin", icon: TbHomeBitcoin},
  {
    name: "Rezerwacje",
    href: "/admin/reservations",
    icon: LuScrollText,
  },
  {name: "Chatbot", href: "/admin/chatbot", icon: BiBot},
  {name: "Relacje", href: "/admin/relations", icon: LuPencilLine},
  {name: "Zawody", href: "/admin/turnee", icon: BiTrophy},
  {name: "podgląd strony", href: "/", icon: BiArrowFromLeft},
];

export default function NavLinks() {
  const pathname = usePathname();

  return links.map((link) => {
    const LinkIcon = link.icon;
    return (
      <Link
        key={link.name}
        href={link.href}
        className={`${styles.listItem} ${
          pathname === link.href ? styles.active : ""
        }`}
      >
        <LinkIcon size={28} />
        <p>{link.name}</p>
      </Link>
    );
  });
}
