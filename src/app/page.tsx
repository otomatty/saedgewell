'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import MainVisual from '@/components/index/organisms/MainVisual/MainVisual';
import Message from '@/components/index/organisms/Message/Message';
import Services from '@/components/index/organisms/Services/Services';
import Works from '@/components/index/organisms/Works/Works';
import Features from '@/components/index/organisms/Features/Features';

export default function Home() {
  return (
    <main className={styles.main}>
      <MainVisual />
      <Message />
      <Services />
      <Works />
      <Features />
    </main>
  );
}
