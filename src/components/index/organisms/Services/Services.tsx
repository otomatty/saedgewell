import React from 'react';
import styles from './Services.module.css';
import MarqueeText from '../../../common/atoms/MarqueeText/MarqueeText';
import UserTypeCards from '../../molecules/UserTypeCards/UserTypeCards';
import ServicesPanel from '../../molecules/ServicesPanel/ServicesPanel';
import { services } from '../../../../data/servicesData';

const Services: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <UserTypeCards />
        <h2 className={styles.sectionTitle}>業務内容</h2>
        <ServicesPanel services={services} />
        <MarqueeText
          text="I provide a variety of services including web and app development, design, consulting, and mentoring to help businesses and individuals achieve their goals."
          animationDuration="240s"
        />
      </div>
    </section>
  );
};

export default Services;
