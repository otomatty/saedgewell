import React from 'react';
import styles from './Services.module.css';
import MarqueeText from '../../../common/atoms/MarqueeText/MarqueeText';
import UserTypeCards from '../../molecules/UserTypeCards/UserTypeCards';
import ServicesPanel from '../../molecules/ServicesPanel/ServicesPanel'; // ServicesPanel imported

const services = [
  {
    title: 'Webサイト制作',
    description: 'サービスや商品を宣伝したい',
    additionalDescription: '自社を紹介したい', // Additional description added
    icon: './images/website.svg', // Icon path added
  },
  {
    title: 'クラウド・システム開発',
    description: '業務を改善したい',
    additionalDescription: 'ITツールを導入したい',
    icon: './images/pc.svg',
  },
  {
    title: '受注・予約システム開発',
    description: '注文を受け付けたい',
    additionalDescription: '予約を受け付けたい',
    icon: './images/calendar.svg',
  },
  {
    title: 'Service 4',
    description: 'Description of service 4.',
    additionalDescription: 'Additional description of service 4.',
    icon: './images/mentor.svg',
  },
  {
    title: 'Service 5',
    description: 'Description of service 5.',
    additionalDescription: 'Additional description of service 5.',
    icon: '/path/to/icon5.png',
  },
  {
    title: 'Service 6',
    description: 'Description of service 6.',
    additionalDescription: 'Additional description of service 6.',
    icon: '/path/to/icon6.png',
  },
  {
    title: 'Service 7',
    description: 'Description of service 7.',
    additionalDescription: 'Additional description of service 7.',
    icon: '/path/to/icon7.png',
  },
];

const Services: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <UserTypeCards />
        <h2 className={styles.sectionTitle}>業務内容</h2>
        <ServicesPanel services={services} /> {/* 1つのグリッドレイアウト */}
        <MarqueeText
          text="I provide a variety of services including web and app development, design, consulting, and mentoring to help businesses and individuals achieve their goals."
          animationDuration="240s" // アニメーションの時間を倍に設定
        />
      </div>
    </section>
  );
};

export default Services;
