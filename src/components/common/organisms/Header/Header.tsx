'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Logo from '../../atoms/Logo/Logo';
import Button from '../../atoms/Button/Button';
import HamburgerButton from '@/components/common/atoms/HamburgerButton/HamburgerButton';
import NavigationModal from '@/components/common/molecules/NavigationModal/NavigationModal';

const Header: React.FC = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsButtonHidden(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsHeaderVisible(true);
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current);
        }
      } else if (window.scrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current);
        }
        hideTimeout.current = setTimeout(() => {
          setIsHeaderVisible(false);
        }, 5000); // 3秒後に非表示
      } else {
        setIsHeaderVisible(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  const handleHamburgerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${isHeaderVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.headerInner}>
        <Logo as={isHomePage ? 'h1' : 'div'} />
        <div className={styles.buttonWrapper}>
          <Button
            label="自動見積もりをする"
            onClick={() => alert('無料相談予約')}
            hidden={isButtonHidden}
          />
          <Button
            label="相談の予約をする"
            onClick={() => alert('無料相談予約')}
            hidden={isButtonHidden}
          />
          {!isModalOpen && <HamburgerButton onClick={handleHamburgerClick} />}
        </div>
      </div>
      <NavigationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
