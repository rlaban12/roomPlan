import {createBrowserRouter} from 'react-router-dom';
import {authCheckLoader, meetingScheduleDetailLoader, userDataLoader} from '../loader/meetingSchedules-loader.js';
import {deleteAction, saveAction as manipulateAction, loginAction, logoutAction} from '../loader/meetingSchedule-actions.js';
import RootLayout from '../layouts/RootLayout.jsx';
import HomeLayout from '../layouts/HomeLayout.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import MeetingScheduleLayout from "../layouts/MeetingScheduleLayout.jsx";
import MeetingSchedulePage from '../pages/MeetingSchedulePage.jsx';
import NewMeetingSchedulePage from '../pages/NewMeetingSchedulePage.jsx';
import MeetingScheduleDetailPage from '../pages/MeetingScheduleDetailPage.jsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      loader: userDataLoader,
      // loader의 리턴데이터는 children(Outlet)들에게는 전달되지 않는게 기본
      // 그런데 id를 주면 Children들이 id로 가져갈 수 있음
      id: 'user-token-data',
      children: [
        {
          path: '',
          element: <HomeLayout />,
          children: [
            {
              index: true,
              element: <WelcomePage />,
              action: loginAction,
            },
            {
              path: '/sign-up',
              element: <SignUpPage />
            },
            {
              path: '/logout',
              action: logoutAction
            }
          ]
        },
        {
          path: 'meeting',
          element: <MeetingScheduleLayout/>,
          loader: authCheckLoader, // 라우트 가드
          children: [
            {
              index: true,
              element: <MeetingSchedulePage/>,
              // loader함수는 언제 실행되냐? 페이지가 라우팅될 때 트리거됨
              // loader: eventListLoader
            },
            {
              path: 'new',
              element: <NewMeetingSchedulePage />,
              // action함수는 CUD를 트리거
              action: manipulateAction
            },
            {
              path: ':meetingId',
              element: <MeetingScheduleDetailPage />,
              loader: meetingScheduleDetailLoader,
              action: deleteAction
            }
          ]
        }
      ]
    },
]);

export default router;