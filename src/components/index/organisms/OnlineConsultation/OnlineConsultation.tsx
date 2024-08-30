import React from 'react';
import ConsultationStats from '../../molecules/ConsultationStats/ConsultationStats';
import SupportedTools from '../../molecules/SupportedTools/SupportedTools';
import styles from './OnlineConsultation.module.css';
import consultations from '../../../../data/consultations.json';

const OnlineConsultation: React.FC = () => {
  return (
    <section className={styles.onlineConsultationSection}>
      <div className={styles.consultationInner}>
        <ConsultationStats consultations={consultations} />
        <SupportedTools />
      </div>
    </section>
  );
};

export default OnlineConsultation;
