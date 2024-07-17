import React from 'react';
import styles from './NavigationList.module.css';

const NavigationList: React.FC = () => {
  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <a href="/">事業内容</a>
        </li>
        <li>
          <a href="/service">事業実績</a>
        </li>
        <li>
          <a href="/dashboard">業務状況</a>
        </li>
        <li>
          <a href="/contact">料金表</a>
        </li>
        <li>
          <a href="/contact">よくある質問</a>
        </li>
        <li>
          <a href="/contact">自己紹介</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationList;
