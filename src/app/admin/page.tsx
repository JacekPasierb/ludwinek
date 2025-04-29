import Link from "next/link";
import React from "react";
import {LuPencilLine, LuScrollText} from "react-icons/lu";
import styles from "../styles/pageAdmin.module.css";
import {BiBot, BiTrophy} from "react-icons/bi";
import {FiFileText} from "react-icons/fi";

const tiles = [
  {href: "/admin/posts", label: "Relacje", icon: <LuPencilLine size={28} />},
  {href: "/admin/zawody", label: "Zawody", icon: <BiTrophy size={32} />},
  {
    href: "/admin/regulamin",
    label: "Regulamin",
    icon: <FiFileText size={32} />,
  },
  {
    href: "/admin/reservations",
    label: "Rezerwacje",
    icon: <LuScrollText size={32} />,
  },
  {href: "/admin/chatbot", label: "ChatBot", icon: <BiBot size={28} />},
];

const page = () => {
  return (
    <div className={styles.grid}>
      {tiles.map(({href, label, icon}) => (
        <Link key={label} href={href} className={styles.tile}>
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default page;
