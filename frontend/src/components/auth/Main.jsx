import React from 'react';
import {Form} from 'react-router-dom';

const Main = ({ userData }) => {
  return (
      <>
        <h2>{userData.email}님 환영합니다.</h2>
        <Form method='POST' action='/logout'>
          <button>Logout</button>
        </Form>
      </>
  );
};

export default Main;