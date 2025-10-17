import styles from './MeetingScheduleNavigation.module.scss';
import { NavLink } from 'react-router-dom';

const MeetingScheduleNavigation = () => {
  const activeClassFn = ({ isActive }) => {
    return isActive ? styles.active : undefined;
  };
  return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink
                  to='/meeting'
                  className={activeClassFn}
                  end>
                All Meetings
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/meeting/new'
                  className={activeClassFn}>
                New MeetingSchedule
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default MeetingScheduleNavigation;