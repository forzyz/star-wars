"use client";

import React, { useEffect, useState } from 'react';
import styles from './AnimateWord.module.css'; // Import the CSS module

// Define the props type
interface AnimateWordProps {
  text: string;
}

const AnimateWord: React.FC<AnimateWordProps> = ({ text }) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    // Reset the letters state when text changes
    setLetters([]);

    const splitText = text.split('');
    const timers: NodeJS.Timeout[] = [];

    splitText.forEach((letter, index) => {
      const timer = setTimeout(() => {
        setLetters(prevLetters => [...prevLetters, letter]);
      }, index * 200); // Stagger the addition of letters
      timers.push(timer);
    });

    // Cleanup function to clear timers
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [text]); // Effect runs when text changes

  return (
    <div className={styles.word}>
      {letters.map((letter, index) => (
        <div key={index} className={styles.letter}>
          {letter === ' ' ? '\u00A0' : letter} {/* Handle spaces correctly */}
        </div>
      ))}
    </div>
  );
};

export default AnimateWord;
