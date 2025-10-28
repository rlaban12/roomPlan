import React from 'react';
import MeetingScheduleForm from '../components/common/MeetingScheduleForm.jsx';
import {useLoaderData} from 'react-router-dom';

const EditPage = () => {

  const meetingSchedule = useLoaderData();

  return (
      <MeetingScheduleForm method='PUT' meetingSchedule={meetingSchedule} />
  );

};

export default EditPage;