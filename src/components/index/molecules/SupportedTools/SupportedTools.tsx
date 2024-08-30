import React from 'react';
import Image from 'next/image';
import styles from './SupportedTools.module.css';

const tools = [
  { name: 'Google Meet', imagePath: '/images/google_meet.webp' },
  { name: 'Google Chat', imagePath: '/images/google_chat.webp' },
  { name: 'Slack', imagePath: '/images/slack.webp' },
  { name: 'Chatwork', imagePath: '/images/chatwork.webp' },
  { name: 'Zoom', imagePath: '/images/zoom.webp' },
  { name: 'Trello', imagePath: '/images/trello.webp' },
  { name: 'Teams', imagePath: '/images/teams.webp' },
  { name: 'Discord', imagePath: '/images/discord.webp' },
];

const SupportedTools: React.FC = () => {
  return (
    <div className={styles.supportedTools}>
      <h2>対応可能ツール</h2>
      <div className={styles.toolList}>
        {tools.map((tool, index) => (
          <span key={index} className={styles.toolTag}>
            <Image
              src={tool.imagePath}
              alt={tool.name}
              height={64}
              width={200}
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SupportedTools;
