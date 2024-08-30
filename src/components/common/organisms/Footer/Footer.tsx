import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import BusinessHours from '@/components/common/molecules/BusinessHours/BusinessHours';
import Logo from '@/components/common/atoms/Logo/Logo';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.companyInfo}>
            <Logo />
            <p>Saedgewell（セージウェル）</p>
            <p>
              〒022-0003 <br />
              岩手県大船渡市盛町字馬場23-7 <br />
              大船渡テレワークセンター内
            </p>
            <p>
              <a href="tel:03-XXXX-XXXX">電話: 070-9109-9293</a>
            </p>
            <p>
              <a href="mailto:info@example.com">メール: saedgewell@gmail.com</a>
            </p>
          </div>
          <BusinessHours />
        </div>
        <div className={styles.footerNavigation}>
          <div className={styles.footerSection}>
            <h3>会社情報</h3>
            <ul>
              <li>
                <Link href="/about">会社概要</Link>
              </li>
              <li>
                <Link href="/mission">ミッション</Link>
              </li>
              <li>
                <Link href="/team">チーム</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>サービス</h3>
            <ul>
              <li>
                <Link href="/services/web-development">Web開発</Link>
              </li>
              <li>
                <Link href="/services/app-development">アプリ開発</Link>
              </li>
              <li>
                <Link href="/services/consulting">ITコンサルティング</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Saedgewell Akimasa Sugai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
