import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const UpdateForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);
  const location = useLocation();

  console.log(location);

  const [board, setBoard] = useState(location.state);

  useEffect(() => {
    // fetchUserInfo();
  }, []);

  async function updateSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        method: 'put',
        url: `http://localhost:8080/api/boards/${id}`,
        headers: {
          Authorization: jwt,
        },
        data: board,
      });
    } catch (error) {
      alert(error.response.data.msg);
      return;
    }
    navigate(`/board/${id}`);
  }

  const changeValue = (e) => {
    const { name, value } = e.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  async function fetchUserInfo() {
    let response = await axios({
      method: 'get',
      url: `http://localhost:8080/api/boards/${id}`,
      headers: {
        Authorization: jwt,
      },
    });

    let responseBody = response.data;
    setBoard({
      title: responseBody.body.title,
      content: responseBody.body.content,
    });
  }

  console.log(board);

  return (
    <div>
      <h1>글수정</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={board.title}
            type='text'
            placeholder='Enter title'
            name='title'
            onChange={changeValue}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as='textarea'
            row={5}
            value={board.content}
            name='content'
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={updateSubmit}>
          글수정
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
