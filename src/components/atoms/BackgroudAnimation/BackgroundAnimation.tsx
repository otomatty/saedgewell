import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './BackgroundAnimation.module.css';

const generateOrbit = (radius: number): Variants => ({
  animate: {
    rotate: 360,
    transition: {
      duration: radius / 10, // 半径に応じて速度を調整
      repeat: Infinity,
      ease: 'linear',
    },
  },
});

const BackgroundAnimation: React.FC = () => {
  const particles = [...Array(10)].map((_, i) => ({
    id: i,
    radius: 50 + i * 20,
    color: `rgba(0, 0, 0, ${Math.random()})`,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.sun} />
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.orbit}
          style={{ width: particle.radius * 2, height: particle.radius * 2 }}
          variants={generateOrbit(particle.radius)}
          animate="animate"
        >
          <div
            className={styles.particle}
            style={{ backgroundColor: particle.color, top: -particle.radius }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
