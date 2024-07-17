'use client';

import React from 'react';
import styles from './WorksStats.module.css';

const WorksStats: React.FC = () => {
  const today = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formattedDate = (
    <time dateTime={today.toISOString()} className={styles.dateContainer}>
      <span className={styles.year}>{today.getFullYear()}</span>
      <div className={styles.monthDay}>
        <span>{months[today.getMonth()]}</span>
        <span>{today.getDate()}</span>
      </div>
    </time>
  );

  // ダミーデータ
  const totalProjects = 23;
  const totalMentees = 213;
  const utilizationRate = 75; // 稼働率のダミーデータ
  const currentProjects = 3;
  const currentMentees = 12;

  const getOrderStatus = (rate: number) => {
    if (rate <= 20) return <span className={styles.orderStatus}>受注可能</span>;
    if (rate <= 50) return <span className={styles.orderStatus}>受注可能</span>;
    if (rate <= 80)
      return <span className={styles.orderStatus}>2件まで受注可能</span>;
    if (rate <= 90)
      return <span className={styles.orderStatus}>１件まで受注可能</span>;
    if (rate <= 100)
      return <span className={styles.orderStatus}>受注不可</span>;
    return <span className={styles.orderStatus}>受注不可</span>;
  };

  const getDeliveryWeeks = (rate: number) => {
    if (rate <= 20) return '2週間';
    if (rate <= 50) return '4週間';
    if (rate <= 80) return '6週間';
    if (rate <= 90) return '8週間';
    if (rate <= 100) return '12週間';
    return '受注不可';
  };

  return (
    <div className={styles.worksStats}>
      <div className={styles.dateItem}>{formattedDate}</div>
      <div className={styles.statsInfo}>
        <h3 className={styles.statsTitle}>現在の業務状況</h3>
        <ul>
          <li className={styles.orderStatusItem}>
            <span className={styles.orderText}>受注状況:</span>{' '}
            {getOrderStatus(utilizationRate)}
          </li>
          <li className={styles.deliveryTimeItem}>
            納期目安: {getDeliveryWeeks(utilizationRate)}以内
          </li>
          <li className={styles.currentProjectsItem}>
            現在のプロジェクト数: {currentProjects}
          </li>
          <li className={styles.totalProjectsItem}>
            累計プロジェクト数: {totalProjects}
          </li>
          <li className={styles.currentMenteesItem}>
            現在のメンティー数: {currentMentees}
          </li>
          <li className={styles.totalMenteesItem}>
            累計メンティー数: {totalMentees}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorksStats;
