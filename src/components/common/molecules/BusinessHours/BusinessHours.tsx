import React from 'react';
import styles from './BusinessHours.module.css';

type DaySchedule = {
  morning: boolean;
  afternoon: boolean;
};

const schedule: Record<string, DaySchedule> = {
  日: { morning: false, afternoon: false },
  月: { morning: true, afternoon: true },
  火: { morning: true, afternoon: true },
  水: { morning: true, afternoon: true },
  木: { morning: true, afternoon: true },
  金: { morning: true, afternoon: true },
  土: { morning: true, afternoon: false },
};

const BusinessHours: React.FC = () => {
  return (
    <div className={styles.businessHours}>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>
              <h3 className={styles.title}>営業時間</h3>
            </th>
            {Object.keys(schedule).map((day) => (
              <th
                key={day}
                className={
                  day === '日'
                    ? styles.sunday
                    : day === '土'
                      ? styles.saturday
                      : ''
                }
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>9:00~12:00</td>
            {Object.values(schedule).map((day, index) => (
              <td key={index}>{day.morning ? '○' : '−'}</td>
            ))}
          </tr>
          <tr>
            <td>13:00~18:00</td>
            {Object.values(schedule).map((day, index) => (
              <td key={index}>{day.afternoon ? '○' : '−'}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>
        ＊ご相談いただければ営業時間外でも対応いたします
      </p>
    </div>
  );
};

export default BusinessHours;
