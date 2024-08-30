'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Columns.module.css';
import articles from '../../../../data/articles.json';
import Articles from '../../molecules/Articles/Articles';
import AccordionButton from '../../../common/atoms/AccordionButton/AccordionButton';

const Columns: React.FC = () => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [numArticles, setNumArticles] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1920) {
        setNumArticles(5);
      } else {
        setNumArticles(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期チェック

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (buttonContainerRef.current) {
      if (showMore) {
        buttonContainerRef.current.style.position = 'sticky';
        buttonContainerRef.current.style.bottom = '1rem';
        buttonContainerRef.current.style.zIndex = '1000';
      } else {
        buttonContainerRef.current.style.position = 'static';
      }
    }
  }, [showMore]);

  const handleImageError = (key: string) => {
    setImageError((prev) => ({ ...prev, [key]: true }));
  };

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className={styles.columnsSection}>
      <div className={styles.sectionInner}>
        <h2>コラム</h2>
        <div className={styles.columns}>
          <Articles
            articles={articles.popular}
            category="人気記事"
            numArticles={numArticles}
            imageError={imageError}
            handleImageError={handleImageError}
          />
          {showMore && (
            <>
              <Articles
                articles={articles.latest}
                category="最新記事"
                numArticles={numArticles}
                imageError={imageError}
                handleImageError={handleImageError}
              />
              <Articles
                articles={articles.themed}
                category="テーマ記事"
                numArticles={numArticles}
                imageError={imageError}
                handleImageError={handleImageError}
              />
            </>
          )}
        </div>
        <div
          ref={buttonContainerRef}
          className={styles.accordionButtonContainer}
        >
          <AccordionButton
            isToggled={showMore}
            onToggle={handleToggleShowMore}
          />
        </div>
      </div>
    </section>
  );
};

export default Columns;
