import styles from './MeetingScheduleItem.module.scss';
import {Link, useSubmit} from 'react-router-dom';

const MeetingScheduleItem = ({meetingSchedule}) => {
  const {
    'department': department,
    'meetingDetails': meetingDetails,
    'usageDate': usageDate,
    'startTime': startTime,
    'endTime': endTime,
  } = meetingSchedule;

  // Form 컴포넌트 없이 action함수를 작동시키는 법
  const submit = useSubmit();

  const handleRemove = e => {
    // Form없이 action함수 트리거 - 낙관적 업데이트
    submit(null, {method:'DELETE'});
  };

  return (
      <article className={styles.meeting}>
        <h1>{department}</h1>
        <p>{meetingDetails}</p>
        <p>{usageDate}</p>
        <p>{startTime} ~ {endTime}</p>
        <menu className={styles.actions}>
          <Link to='edit'>Edit</Link>
          <button onClick={handleRemove}>Delete</button>
        </menu>
      </article>
  );

};

export default MeetingScheduleItem;