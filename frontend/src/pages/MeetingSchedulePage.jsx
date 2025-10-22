import React, { useEffect, useState } from 'react';
import styles from './MeetingSchedulePage.module.scss';
import { MEETING_API_URL } from '../config/host-config.js';
import { fetchWithAuth } from '../config/api.js';

const MeetingSchedulePage = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10);
  const [meetingScheduleList, setMeetingScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  // ✅ 날짜별로 그룹화하면서 시간순 정렬
  const groupMeetingsByDate = (data) => {
    const grouped = {};

    data.forEach((meeting) => {
      // "2025년 10월 21일" → "2025-10-21"
      const dateKey = meeting.usageDate
          .replace('년 ', '-')
          .replace('월 ', '-')
          .replace('일', '')
          .trim();

      if (!grouped[dateKey]) grouped[dateKey] = [];

      grouped[dateKey].push({
        dept: meeting.department,
        start: meeting.startTime,
        end: meeting.endTime,
      });
    });

    // ✅ 각 날짜별 회의 리스트를 시작 시간순으로 정렬
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => (a.start > b.start ? 1 : -1));
    });

    return grouped;
  };

  const fetchMeetingSchedules = async () => {
    if (isFinish || loading) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500)); // 로딩 시뮬레이션

    try {
      const response = await fetchWithAuth(`${MEETING_API_URL}`);
      const { meetingScheduleList } = await response.json();
      setMeetingScheduleList(meetingScheduleList);
    } catch (error) {
      console.error('회의 일정 불러오기 실패:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMeetingSchedules();
  }, []);

  // ✅ 달력용 날짜 계산
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
  const meetingsByDate = groupMeetingsByDate(meetingScheduleList);

  return (
      <div className={styles['calendar-container']}>
        <div className={styles['calendar-header']}>
          <div className={styles['select-group']}>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {[2024, 2025, 2026].map((y) => (
                  <option key={y}>{y}</option>
              ))}
            </select>
            <span>년</span>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m}>{m}</option>
              ))}
            </select>
            <span>월</span>
          </div>
        </div>

        <table className={styles['calendar-table']}>
          <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <th key={day}>{day}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  const dateKey = day
                      ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      : null;

                  return (
                      <td key={j}>
                        {day ? (
                            <>
                              <div className={styles['date']}>{day}</div>
                              {meetingsByDate[dateKey] ? (
                                  <div className={styles['meeting-list']}>
                                    {meetingsByDate[dateKey].map((m, idx) => (
                                        <div key={idx} className={styles['meeting-item']}>
                                          <p className={styles['dept']}>{m.dept}</p>
                                          <p className={styles['time']}>
                                            {m.start} ~ {m.end}
                                          </p>
                                        </div>
                                    ))}
                                  </div>
                              ) : (
                                  <div className={styles['empty']}></div>
                              )}
                            </>
                        ) : (
                            <div className={styles['empty']}></div>
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
