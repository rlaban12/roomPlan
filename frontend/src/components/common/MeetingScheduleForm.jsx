import styles from './MeetingScheduleForm.module.scss';
import { useNavigate, Form } from 'react-router-dom';
import { useRef } from 'react';

const MeetingScheduleForm = ({ method, meetingSchedule = {} }) => {

  const navigate = useNavigate();

  // 각 입력 필드를 참조하기 위해 useRef 사용
  const departmentRef = useRef();
  const usageDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const { department, meetingDetails, usageDate, startTime, endTime } = meetingSchedule;

  // yyyy년 MM월 dd일 → yyyy-MM-dd 형식으로 변환
  const formatDate = (date) => {
    if (!date) return '';
    const [yearPart, monthDayPart] = date.split('년 ');
    const [monthPart, dayPart] = monthDayPart.split('월 ');
    return `${yearPart}-${monthPart}-${dayPart.replace('일', '')}`;
  };

  // 🔸 폼 제출 시 유효성 검사
  const handleSubmit = (e) => {
    const departmentValue = departmentRef.current.value.trim();
    const usageDateValue = usageDateRef.current.value.trim();
    const startTimeValue = startTimeRef.current.value.trim();
    const endTimeValue = endTimeRef.current.value.trim();

    if (!departmentValue || !usageDateValue || !startTimeValue || !endTimeValue) {
      e.preventDefault(); // 제출 막기
      alert('⚠️ 부서명, 사용일자, 시작시간, 종료시간은 필수 입력 항목이에요!');
      return;
    }

    // 추가 검증 (시작시간이 종료시간보다 늦을 때)
    if (startTimeValue >= endTimeValue) {
      e.preventDefault();
      alert('⚠️ 시작시간은 종료시간보다 빨라야 해요!');
      return;
    }
  };

  return (
      <Form
          method={method}
          className={styles.form}
          noValidate
          onSubmit={handleSubmit} // 🔸 유효성 검사 핸들러 등록
      >
        <p>
          <label htmlFor='department'>부서명</label>
          <input
              id='department'
              type='text'
              name='department'
              required
              defaultValue={meetingSchedule ? department : ''}
              ref={departmentRef}
          />
        </p>

        <p>
          <label htmlFor='meetingDetails'>일정 내용(선택)</label>
          <textarea
              id='meetingDetails'
              name='meetingDetails'
              rows='5'
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
              ref={usageDateRef}
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
              ref={startTimeRef}
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
              ref={endTimeRef}
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
