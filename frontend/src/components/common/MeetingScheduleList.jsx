import styles from "../common/MeetingScheduleList.module.scss";
import React from "react";
import {Link, NavLink} from "react-router-dom";

const MeetingScheduleList = ({weeks, year, setYear, month, setMonth, meetingsByDate}) => {

  return(
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
                                  meetingsByDate[dateKey].map((m, idx) => (
                                      <NavLink
                                          key={idx}
                                          to={`/meeting/${m.id}`} // 각 회의 고유 id로 이동
                                          className={styles['meeting-list']}
                                      >
                                        <div className={styles['meeting-item']}>
                                          <p className={styles['dept']}>{m.dept}</p>
                                          <p className={styles['time']}>
                                            {m.start} ~ {m.end}
                                          </p>
                                        </div>
                                      </NavLink>
                                  ))
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

export default MeetingScheduleList;