import React from "react";

type TittleProps = {
  title: string;
};

const Tittle = ({title}: TittleProps) => {
  return <h3 style={{marginBottom: "1rem", cursor: "default"}}>{title}</h3>;
};

export default Tittle;
