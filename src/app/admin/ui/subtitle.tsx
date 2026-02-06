import React from "react";
import styles from "../styles/subtitle.module.css";

type SubtitleProps = {
  title: string;
  as?: "h2" | "h3" | "h4";
};

const Subtitle = ({ title, as: Tag = "h3" }: SubtitleProps) => (
  <Tag className={styles.subtitle}>{title}</Tag>
);

export default Subtitle;
