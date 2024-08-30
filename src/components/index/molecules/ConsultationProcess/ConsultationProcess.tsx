'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ConsultationProcess.module.css';
import { FaCalendarAlt, FaClipboardList, FaVideo } from 'react-icons/fa';

const steps = [
  {
    title: '相談の予約',
    description:
      '便利なオンラインカレンダーから、ご都合の良い日時をお選びいただけます。',
    icon: FaCalendarAlt,
  },
  {
    title: '事前アンケートの回答',
    description:
      '効果的な相談を行うため、簡単なアンケートにお答えいただきます。',
    icon: FaClipboardList,
  },
  {
    title: 'オンライン相談',
    description: 'ビデオ通話を通じて、専門家が丁寧にご相談に応じます。',
    icon: FaVideo,
  },
];

const ConsultationProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animationCompleted = localStorage.getItem(
      'consultationProcessAnimated'
    );
    if (animationCompleted) {
      setActiveStep(steps.length - 1);
      setHasAnimated(true);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              animateTimeline();
            }
          });
        },
        { threshold: 0.1 }
      );

      const currentTimelineRef = timelineRef.current;

      if (currentTimelineRef) {
        observer.observe(currentTimelineRef);
      }

      return () => {
        if (currentTimelineRef) {
          observer.unobserve(currentTimelineRef);
        }
      };
    }
  }, [hasAnimated]);

  const animateTimeline = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
        setHasAnimated(true);
        localStorage.setItem('consultationProcessAnimated', 'true');
      }
    }, 1000);
  };

  return (
    <div className={styles.processContainer} ref={timelineRef}>
      <h3 className={styles.processTitle}>ご相談までの流れ</h3>
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.timelineStep} ${activeStep >= index ? styles.active : ''}`}
          >
            <div className={styles.timelineContent}>
              <div className={styles.timelineDot}>
                <step.icon className={styles.timelineIcon} />
              </div>
              <h4 className={styles.timelineTitle}>{step.title}</h4>
              <p className={styles.timelineDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationProcess;
