import styles from './MeetingScheduleForm.module.scss';
import {useNavigate, Form} from 'react-router-dom';

const MeetingScheduleForm = ({ method, meetingSchedule={} }) => {

  // 새로고침 없이 페이지 이동
  const navigate = useNavigate();

  const { 'department':department, 'meetingDetails':meetingDetails, 'usageDate': usageDate, 'startTime': startTime, 'endTime': endTime} = meetingSchedule;

  // yyyy년 MM월 dd일 ->  yyyy-MM-dd 로 변경
  const formatDate = (date) => {
    if (!date) return;
    const [yearPart, monthDayPart] = date.split('년 ');
    const [monthPart, dayPart] = monthDayPart.split('월 ');

    return `${yearPart}-${monthPart}-${dayPart.replace('일', '')}`;

  };

  // route설정에 있는 action함수를 트리거하려면 Form이라는 컴포넌트가 필요하다.
  // 필수 속성으로 method속성을 지정해야 함.
  return (
      <Form
          method={method}
          className={styles.form}
          noValidate
      >
        <p>
          <label htmlFor='department'>부서명</label>
          <input
              id='department'
              type='text'
              name='department'
              required
              defaultValue={meetingSchedule ? department: ''}
          />
        </p>
        <p>
          <label htmlFor='meetingDetails'>일정 내용(선택)</label>
          <textarea
              id='meetingDetails'
              name='meetingDetails'
              rows='5'
              required
              defaultValue={meetingSchedule ? meetingDetails : ''}
          />
        </p>
        <p>
          <label htmlFor='usageDate'>UsageDate</label>
          <input
              id='usageDate'
              type='date'
              name='usageDate'
              required
              defaultValue={meetingSchedule ? formatDate(usageDate) : ''}
          />
        </p>
        <p>
          <label htmlFor='startTime'>Start Time</label>
          <input
              id='startTime'
              type='time'
              name='startTime'
              required
              defaultValue={meetingSchedule ? startTime : ''}
          />
        </p>
        <p>
          <label htmlFor='endTime'>End Time</label>
          <input
              id='endTime'
              type='time'
              name='endTime'
              required
              defaultValue={meetingSchedule ? endTime : ''}
          />
        </p>
        <div className={styles.actions}>
          <button type='button' onClick={() => navigate('..')}>Cancel</button>
          <button>{method === 'POST' ? 'Save' : 'Update'}</button>
        </div>
      </Form>
  );

};

export default MeetingScheduleForm;