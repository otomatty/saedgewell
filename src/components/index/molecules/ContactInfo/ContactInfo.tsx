'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './ContactInfo.module.css';
import { FaPhone, FaEnvelope, FaComments } from 'react-icons/fa';
import Modal from '@/components/common/atoms/Modal/Modal';
import ContactForm from '@/components/index/molecules/ContactForm/ContactForm';
import Button from '@/components/common/atoms/Button/Button';

const ContactInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.contactInfo}>
      <h3 className={styles.contactTitle}>お問い合わせ方法</h3>
      <div className={styles.contactMethods}>
        <div className={styles.contactMethod}>
          <FaPhone className={styles.icon} />
          <h4>電話でのお問い合わせ</h4>
          <a href="tel:0120-XXX-XXX" className={styles.contactLink}>
            0120-XXX-XXX
          </a>
          <p>平日 9:00-18:00</p>
        </div>
        <div className={styles.contactMethod}>
          <FaEnvelope className={styles.icon} />
          <h4>メールでのお問い合わせ</h4>
          <a href="mailto:info@example.com" className={styles.contactLink}>
            info@example.com
          </a>
        </div>
        <div className={styles.contactMethod}>
          <FaComments className={styles.icon} />
          <h4>お問い合わせフォーム</h4>
          <Button label="フォームを開く" onClick={handleOpenModal} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default ContactInfo;
