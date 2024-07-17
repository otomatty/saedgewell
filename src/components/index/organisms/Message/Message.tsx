import React from 'react';
import styles from './Message.module.css';
import MessageAnimation from '../../atoms/MessageAnimation/MessageAnimation';
import MarqueeText from '../../../common/atoms/MarqueeText/MarqueeText'; // MarqueeText imported

const Message: React.FC = () => {
  return (
    <section className={styles.messageSection}>
      <div className={styles.messageInner}>
        <div className={styles.svgWrapper}>
          <MessageAnimation />
        </div>
        <div className={styles.text}>
          <h2 className={styles.title}>長期思考で課題を解決する</h2>
          <p className={styles.content}>
            様々な技術やツールなど登場し、常に環境が変化し続ける現代においては
            <br />
            <span>着実な成果</span>を求める必要があります
          </p>
          <p className={styles.content}>
            しかし<span>長期的な成果</span>
            を求めなければイノベーションを起こすことはできず、
            <br />
            成長し続けることもできないというのも事実です
          </p>
          <p className={styles.content}>
            Sædgewell(セージウェル)では、<span>「長期思考」</span>と
            <span>「1%の改善」</span>
            を目標とし、
            <br />
            あらゆる課題を解決するための取り組みを行っております
          </p>
          <p className={styles.content}>
            1人でも多くの方のお役に立てるよう
            <br />
            ITツール・クラウドの導入、そして人材育成を通して
            <br />
            企業やコミュニティ、個人の成長を支えていまいります
          </p>
        </div>
      </div>
      <MarqueeText text="Akimasa Sugai Saedgewell" />
    </section>
  );
};

export default Message;
