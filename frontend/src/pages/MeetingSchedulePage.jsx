import React, { useEffect, useState } from 'react';
import { MEETING_API_URL } from '../config/host-config.js';
import { fetchWithAuth } from '../config/api.js';
import MeetingScheduleList from "../components/common/MeetingScheduleList.jsx";

const MeetingSchedulePage = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10);
  const [meetingScheduleList, setMeetingScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 날짜별로 그룹화하면서 시간순 정렬
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

    // 각 날짜별 회의 리스트를 시작 시간순으로 정렬
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => (a.start > b.start ? 1 : -1));
    });

    return grouped;
  };

  const fetchMeetingSchedules = async () => {
    if (loading) return;
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
  const meetingsByDate = groupMeetingsByDate(meetingScheduleList);

  return (
      <>
        <MeetingScheduleList
            weeks={weeks}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            meetingsByDate={meetingsByDate}
        />
      </>
  );
};

export default MeetingSchedulePage;
