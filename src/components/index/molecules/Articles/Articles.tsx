import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Articles.module.css';

interface Article {
  title: string;
  link: string;
  thumbnail: string;
  date: string;
  tags: string[];
}

interface ArticlesProps {
  articles: Article[];
  category: string;
  numArticles: number;
  imageError: { [key: string]: boolean };
  handleImageError: (key: string) => void;
}

const Articles: React.FC<ArticlesProps> = ({
  articles,
  category,
  numArticles,
  imageError,
  handleImageError,
}) => {
  return (
    <div className={styles.column}>
      <h3>{category}</h3>
      <ul className={styles.articleList}>
        {articles.slice(0, numArticles).map((article, index) => {
          const key = `${category}-${index}`;
          return (
            <li key={key}>
              <Link href={article.link} passHref legacyBehavior>
                <article className={styles.article}>
                  <Image
                    src={
                      imageError[key]
                        ? '/images/no-image.svg'
                        : article.thumbnail
                    }
                    alt={article.title}
                    width={200}
                    height={100}
                    className={styles.thumbnail}
                    onError={() => handleImageError(key)}
                  />
                  <div className={styles.articleContent}>
                    <time className={styles.date}>{article.date}</time>
                    <div className={styles.tags}>
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={styles.title}>{article.title}</div>
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={`/${category.toLowerCase()}`} passHref>
        <span className={styles.moreLink}>もっと見る</span>
      </Link>
    </div>
  );
};

export default Articles;
