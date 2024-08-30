'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalculator, FaComments } from 'react-icons/fa';
import styles from './ServicesPanel.module.css';

interface Service {
  title: string;
  subTitle: string;
  description: string;
  additionalDescription: string;
  icon: string;
  details: string;
  portfolioLink: string;
  pricingLink: string;
  faqLink: string;
}

interface ServicesPanelProps {
  services: Service[];
}

const ServicesPanel: React.FC<ServicesPanelProps> = ({ services }) => {
  const [expandedIndexTop, setExpandedIndexTop] = useState<number | null>(null);
  const [expandedIndexBottom, setExpandedIndexBottom] = useState<number | null>(
    null
  );

  const estimateButtonRef = useRef<HTMLButtonElement>(null);
  const consultButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const resizeButtons = () => {
      [estimateButtonRef, consultButtonRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = `${ref.current.offsetWidth}px`;
        }
      });
    };

    resizeButtons();
    window.addEventListener('resize', resizeButtons);

    return () => {
      window.removeEventListener('resize', resizeButtons);
    };
  }, []);

  const toggleExpand = (index: number, isTop: boolean) => {
    if (isTop) {
      setExpandedIndexTop(expandedIndexTop === index ? null : index);
      setExpandedIndexBottom(null);
    } else {
      setExpandedIndexBottom(expandedIndexBottom === index ? null : index);
      setExpandedIndexTop(null);
    }
  };

  const renderServiceCard = (
    service: Service,
    index: number,
    isTop: boolean
  ) => {
    const isExpanded =
      (isTop ? expandedIndexTop : expandedIndexBottom) === index;
    return (
      <div
        key={index}
        className={`${styles.serviceCard} ${isExpanded ? styles.expanded : ''}`}
        onClick={() => toggleExpand(index, isTop)}
      >
        <div className={styles.serviceIconWrapper}>
          <Image
            src={service.icon}
            alt={`${service.title}`}
            width={120}
            height={120}
            className={`${styles.serviceIcon} ${isExpanded ? styles.expandedIcon : ''}`}
          />
        </div>
        <div className={styles.serviceContent}>
          <p className={styles.serviceDescription}>{service.description}</p>
          <p className={styles.serviceDescription}>
            {service.additionalDescription}
          </p>
        </div>
        <div className={styles.serviceTitleWrapper}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
        </div>
      </div>
    );
  };

  const renderServiceDetails = (service: Service) => (
    <div className={styles.serviceDetails}>
      <div className={styles.serviceDetailsTop}>
        <div className={styles.serviceDetailsInfo}>
          <p className={styles.serviceDetailsSubtitle}>{service.subTitle}</p>
          <h3 className={styles.serviceDetailsTitle}>{service.title}</h3>
          <p className={styles.serviceDetailsDescription}>{service.details}</p>
        </div>
        <div className={styles.serviceDetailsButtons}>
          <button ref={estimateButtonRef} className={styles.estimateButton}>
            <FaCalculator className={styles.buttonIcon} />
            <span className={styles.buttonText}>自動見積もり</span>
          </button>
          <button ref={consultButtonRef} className={styles.consultButton}>
            <FaComments className={styles.buttonIcon} />
            <span className={styles.buttonText}>相談してみる</span>
          </button>
        </div>
      </div>
      <div className={styles.serviceDetailsBottom}>
        <Link href={service.portfolioLink} className={styles.serviceLink}>
          制作実績を見る
        </Link>
        <Link href={service.pricingLink} className={styles.serviceLink}>
          料金表を確認
        </Link>
        <Link href={service.faqLink} className={styles.serviceLink}>
          よくある質問
        </Link>
      </div>
    </div>
  );

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesWrapperTop}>
        {services
          .slice(0, 3)
          .map((service, index) => renderServiceCard(service, index, true))}
      </div>
      {expandedIndexTop !== null &&
        renderServiceDetails(services[expandedIndexTop])}
      <div className={styles.servicesWrapperBottom}>
        {services
          .slice(3)
          .map((service, index) => renderServiceCard(service, index, false))}
      </div>
      {expandedIndexBottom !== null &&
        renderServiceDetails(services[expandedIndexBottom + 3])}
    </div>
  );
};

export default ServicesPanel;
