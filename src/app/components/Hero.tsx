"use client";

import {usePathname} from "next/navigation";
import styles from "../styles/hero.module.css";
import Navbar from "./Navbar";
import Image from "next/image";
import {useState} from "react";
import PaymentModal from "./PaymentModal";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const Hero = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (isAdmin) return null;

  const { data, mutate } = useSWR("/api/siteinfo", fetcher);
  const title = data?.heroTitle ?? "";
  const subtitle = data?.heroSubtitle ?? "";

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <Navbar />
        <div className={styles.boxWrapper} id="oplata">
          <Image
            src="/postBoxB.png"
            alt="Opłata"
            width={100}
            height={150}
            className={styles.postBox}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="container">
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>
          {subtitle}
          </p>
          <Image
            src="/logoB.png"
            alt="Opłata"
            width={230}
            height={128}
            className={styles.heroIcon}
          />
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
