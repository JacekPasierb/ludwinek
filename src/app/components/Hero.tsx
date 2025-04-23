"use client"

import { usePathname } from "next/navigation";
import styles from "../styles/hero.module.css";
import Navbar from "./Navbar";

export default function Hero() {

  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if(isAdmin) return null

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <Navbar />
        <div className={styles.boxWrapper} id="oplata">
          <img src="/postBoxB.png" alt="Opłata" className={styles.postBox} />
        </div>
        <div className="container">
          <h1 className={styles.title}>ŁOWISKO EKO-TORF LUDWINEK</h1>
          <p className={styles.subtitle}>
            Profesjonalne łowisko w sercu Lubelszczyzny
          </p>
          <img src="/logoB.png" alt="Opłata" className={styles.heroIcon} />
        </div>
      </div>
    </section>
  );
}
