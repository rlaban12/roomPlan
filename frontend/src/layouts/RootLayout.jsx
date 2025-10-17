import React from 'react';
import MainNavigation from '../components/common/MainNavigation.jsx';
import {Outlet} from 'react-router-dom';

const RootLayout = () => {
  return (
      <>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </>
  );
};

export default RootLayout;