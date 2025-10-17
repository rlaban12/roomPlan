import React from 'react';
import MeetingScheduleNavigation from '../components/common/MeetingScheduleNavigation.jsx';
import {Outlet} from 'react-router-dom';

const MeetingScheduleLayout = () => {
  return (
      <>
        <MeetingScheduleNavigation />
        <Outlet />
      </>
  );
};

export default MeetingScheduleLayout;