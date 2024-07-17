import React from 'react';
import Image from 'next/image';
import styles from './ServicesPanel.module.css';

interface Service {
  title: string;
  description: string;
  additionalDescription: string;
  icon: string;
}

interface ServicesPanelProps {
  services: Service[];
}

const ServicesPanel: React.FC<ServicesPanelProps> = ({ services }) => {
  return (
    <div className={styles.servicesWrapper}>
      {services.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
          <Image
            src={service.icon}
            alt={`${service.title}`}
            width={40}
            height={40}
            className={styles.serviceIcon}
          />
          <p className={styles.serviceDescription}>{service.description}</p>
          <p className={styles.serviceAdditionalDescription}>
            {service.additionalDescription}
          </p>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ServicesPanel;
