// 회의 일정을 등록하는 함수

import {redirect} from 'react-router-dom';
import {AUTH_API_URL, MEETING_API_URL} from '../config/host-config.js';
import {fetchWithAuth} from '../config/api.js';

export const saveAction = async ({ request, params }) => {
  // console.log('save action!!');

  // form에 입력한 값 가져오기
  const formData = await request.formData();

  // 서버로 보낼 payload
  const payload = {
    department: formData.get('department'),
    meetingDetails: formData.get('meetingDetails'),
    usageDate: formData.get('usageDate'),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
  };

  let requestUrl = MEETING_API_URL;
  if (request.method === 'PUT') {
    requestUrl += `/${params.meetingId}`;
  }

  const response = await fetchWithAuth(requestUrl, request.method, payload);

  if (!response.ok) {
    throw new Error('이벤트 생성에 실패했습니다.');
  }

  // 목록페이지로 리다이렉트
  return redirect('/meeting');
};

// 삭제처리 액션 함수
export const deleteAction = async ({params}) => {
  if (!confirm('정말 삭제하시겠습니까?')) return;

  console.log('삭제 액션 함수 호출!');

  const res = await fetchWithAuth(`${MEETING_API_URL}/${params.meetingId}`, 'DELETE');

  return redirect('/meeting');
};

// 로그인 처리 액션함수
export const loginAction = async ({ request }) => {

  // 입력데이터 읽기
  const formData = await request.formData();

  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (response.status === 422) {
    // 서버에서 응답한 데이터를 컴포넌트에서 가져다 사용할 수 있게 데이터를 리턴.
    // 그럼 action함수를 처리하는 컴포넌트는 useActionData라는 훅으로 사용가능
    return data.message;
  }

  // 로그인에 성공했을 때 - 토큰을 저장
  localStorage.setItem('userData', JSON.stringify(data));

  return redirect('/');
};

// 로그아웃 처리 액션
export const logoutAction = () => {
  console.log('logout action!!');

  localStorage.removeItem('userData');

  // element가 없는 route path의 액션이나 로더함수는 반드시 redirect를 필수로 사용
  return redirect('/');
};


