import React from 'react';
import Link from 'next/link';
import styles from './Contact.module.css';
import ConsultationProcess from '../../molecules/ConsultationProcess/ConsultationProcess';
import ContactInfo from '../../molecules/ContactInfo/ContactInfo';

const Contact: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>相談のご予約</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.consultationProcess}>
            <ConsultationProcess />
          </div>
          <div className={styles.contactInfo}>
            <ContactInfo />
          </div>
        </div>
        <Link href="/reservation" passHref>
          <button className={styles.reservationButton}>相談を予約する</button>
        </Link>
      </div>
    </section>
  );
};

export default Contact;
