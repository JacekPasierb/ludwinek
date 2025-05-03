import React from "react";
import styles from "../styles/subtitle.module.css";

type SubtitleProps = {
  title: string;
};

const Subtitle = ({title}: SubtitleProps) => {
  return <h3 className={styles.subtitle}>{title}</h3>;
};

export default Subtitle;
