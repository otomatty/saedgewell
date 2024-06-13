import React, { useEffect, useState } from "react";
import styles from "./TextAnimation.module.css";

export interface TextAnimationProps {
  words: string[];
  interval?: number;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  words,
  interval = 4000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      } else {
        setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === currentWord) {
        setTimeout(() => setIsDeleting(true), interval);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) =>
          prevIndex === words.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [
    displayedText,
    isDeleting,
    typingSpeed,
    words,
    currentWordIndex,
    interval,
  ]);

  return (
    <h3 className={styles.typing}>
      {displayedText}
      <span className={styles.cursor} />
    </h3>
  );
};

export default TextAnimation;
