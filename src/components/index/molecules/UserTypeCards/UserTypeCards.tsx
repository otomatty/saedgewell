import React from 'react';
import Link from 'next/link';
import styles from './UserTypeCards.module.css';

const userTypes = [
  { title: 'はじめの方へ', link: '/beginner' },
  { title: '企業の方へ', link: '/business' },
  { title: 'フリーランスの方へ', link: '/freelance' },
  { title: 'ご契約者様へ', link: '/contract' },
];

const UserTypeCards: React.FC = () => {
  return (
    <div className={styles.userTypeContainer}>
      {userTypes.map((userType, index) => (
        <Link key={index} href={userType.link} passHref>
          <div className={styles.userTypeCard}>
            <span className={styles.userTypeLink}>{userType.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserTypeCards;
