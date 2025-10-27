import React from 'react';
import {useLoaderData} from 'react-router-dom';
import MeetingScheduleItem from '../components/common/MeetingScheduleItem.jsx';

// /meeting/:id
const MeetingScheduleDetailPage = () => {

  const detailMeetingSchedule = useLoaderData();

  return (
      <MeetingScheduleItem  meetingSchedule={detailMeetingSchedule} />
  );
};

export default MeetingScheduleDetailPage;