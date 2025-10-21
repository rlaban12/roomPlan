// import React, {useEffect, useRef, useState} from 'react';
import React, {useState} from 'react';

import styles from './MeetingSchedulePage.module.scss';

import {MEETING_API_URL} from '../config/host-config.js';
// import {fetchWithAuth} from '../config/api.js';

const MeetingSchedulePage = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10);

  // 예시 데이터
  const meetings = {
    "2025-10-30": [
      { dept: "개발부", time: "10:00 ~ 11:00" },
      { dept: "영업부", time: "14:00 ~ 15:00" },
      { dept: "사업부", time: "16:00 ~ 17:00" },
    ],
    "2025-10-31": [
      { dept: "개발부", time: "10:00 ~ 11:00" },
      { dept: "영업부", time: "14:00 ~ 15:00" },
      { dept: "사업부", time: "16:00 ~ 17:00" },
      { dept: "경엉지원", time: "18:00 ~ 19:00" },
    ],
  };

  // 달력용 날짜 계산
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day++);
        }
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = getDaysInMonth(year, month);

  return (
      <div className={styles["calendar-container"]}>
        <div className={styles["calendar-header"]}>
          <div className={styles["select-group"]}>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {[2024, 2025, 2026].map((y) => (
                  <option key={y}>{y}</option>
              ))}
            </select>
            <span>
              년
            </span>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m}>{m}</option>
              ))}
            </select>
            <span>
              월
            </span>
          </div>
        </div>

        <table className={styles["calendar-table"]}>
          <thead>
          <tr>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <th key={day}>{day}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  const dateKey = day
                      ? `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                      : null;

                  return (
                      <td key={j}>
                        {day ? (
                            <>
                              <div className={styles["date"]}>{day}</div>
                              {meetings[dateKey] ? (
                                  <div className={styles["meeting-list"]}>
                                    {meetings[dateKey].map((m, idx) => (
                                        <div key={idx} className={styles["meeting-item"]}>
                                          <p className={styles["dept"]}>{m.dept}</p>
                                          <p className={styles["time"]}>{m.time}</p>
                                        </div>
                                    ))}
                                  </div>
                              ) : (
                                  <div className={styles[".empty"]}></div>
                              )}
                            </>
                        ) : (
                            <div className={styles[".empty"]}></div>
                        )}
                      </td>
                  );
                })}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );

};

export default MeetingSchedulePage;
