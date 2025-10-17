import {createBrowserRouter} from 'react-router-dom';
// import {authCheckLoader, meetingScheduleDetailLoader, userDataLoader} from '../loader/meetingSchedules-loader.js';
// import {deleteAction, saveAction as manipulateAction, loginAction, logoutAction} from '../loader/meetingSchedule-actions.js';
import {userDataLoader} from '../loader/meetingSchedules-loader.js';
import {loginAction, logoutAction} from '../loader/meetingSchedule-actions.js';
import RootLayout from '../layouts/RootLayout.jsx';
import HomeLayout from '../layouts/HomeLayout.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';

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
            // {
            //   path: '/sign-up',
            //   element: <SignUpPage />
            // },
            {
              path: '/logout',
              action: logoutAction
            }
          ]
        },
        {

        }
      ]
    },
]);

export default router;