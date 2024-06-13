import React from "react";
import TextAnimation from "../../atoms/TextAnimation/TextAnimation";
import styles from "./Catchphrase.module.css";

export interface CatchphraseProps {
  title: string;
  catchphrases: string[];
  interval?: number;
}

const Catchphrase: React.FC<CatchphraseProps> = ({
  title,
  catchphrases,
  interval = 4000,
}) => {
  const titleLines = title.split("\n");

  return (
    <div className={styles.container}>
      {titleLines.map((line, index) => (
        <h2 key={index} className={styles.title}>
          {line}
        </h2>
      ))}
      <TextAnimation words={catchphrases} interval={interval} />
    </div>
  );
};

export default Catchphrase;
