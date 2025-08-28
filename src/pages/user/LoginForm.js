import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store';

const LoginForm = (props) => {
  const dispatch = useDispatch(); // reducer 호출
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  async function submitLogin(e) {
    e.preventDefault();

    try {
      let response = await axios({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: user, // axios 는 javascript 오브젝트를 전달하면 json 으로 자동 변환 해줌
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let jwt = response.headers.getAuthorization();

      localStorage.setItem('jwt', jwt);

      dispatch(login(jwt)); // dispatch 를 사용할 때 action 만 전달하면 된다. 상태 변경을 액션 함수로 관리한다

      navigate('/');
    } catch (error) {
      alert(error.response.data.msg);
      return;
    }
  }

  const changeValue = (e) => {
    // 유효성 검사를 함

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    // 통신해서 중복체크 함
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          name='username'
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          name='password'
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;
