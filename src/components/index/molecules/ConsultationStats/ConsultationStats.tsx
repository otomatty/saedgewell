import React from 'react';
import styles from './ConsultationStats.module.css';

interface Consultation {
  year: number;
  month: string;
  location: string;
  industry: string;
  content: string;
}

interface ConsultationStatsProps {
  consultations: Consultation[];
}

const ConsultationStats: React.FC<ConsultationStatsProps> = ({
  consultations,
}) => {
  return (
    <div className={styles.consultationStats}>
      <h2>オンラインでのご相談も承っております</h2>
      <p>
        ビデオ会議、チャットツールはお客様のご使用されているツールをそのままご利用いただけます
      </p>
      <div className={styles.consultationListWrapper}>
        <ul className={styles.consultationList}>
          {consultations.map((consultation, index) => (
            <li key={index}>
              {`${consultation.year}年${consultation.month}　${consultation.location}の${consultation.industry}様より${consultation.content}のご相談をいただきました`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConsultationStats;
