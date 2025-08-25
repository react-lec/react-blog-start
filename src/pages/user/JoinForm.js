import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JoinForm = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  function changeValue(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function submitJoin(e) {
    e.preventDefault(); // 새로고침 막기 (action 발동 막기)

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8080/join',
        data: user, // axios 는 javascript 오브젝트를 전달하면 json 으로 자동 변환 해줌
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      alert(error.response.data.msg);
      return;
    }

    navigate('/login-form');
  }

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

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          name='email'
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={submitJoin}>
        회원가입
      </Button>
    </Form>
  );
};

export default JoinForm;
