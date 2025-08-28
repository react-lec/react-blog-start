import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Detail = (props) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: undefined,
    title: '',
    content: '',
    userId: undefined,
    username: '',
    owner: false,
    replies: [],
  });

  useEffect(() => {
    fetchDetail(id);
  }, []);

  async function fetchDetail(boardId) {
    let response = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });
    let responseBody = response.data;
    setBoard(responseBody.body);
  }

  async function fetchDelete(boardId) {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });

    navigate('/');
  }

  async function fetchReplyDelete(replyId) {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/api/replies/${replyId}`,
      headers: {
        Authorization: jwt,
      },
    });

    let newReplies = board.replies.filter((r) => r.id !== replyId);

    setBoard({
      ...board,
      replies: newReplies,
    });
  }

  // update-form 갈 때 상세보기의 상태 board 를 가져가서 사용
  return (
    <div>
      {board.owner ? (
        <>
          <Link
            to={`/update-form/${board.id}`}
            state={{
              title: board.title,
              content: board.content,
            }}
            className='btn btn-warning'
          >
            수정
          </Link>
          <Button
            className='btn btn-danger'
            onClick={() => fetchDelete(board.id)}
          >
            삭제
          </Button>
        </>
      ) : (
        <></>
      )}

      <br />
      <br />
      <h1>{board.title}</h1>
      <hr />
      <div>{board.content}</div>
      <br />
      <br />
      <hr />
      {/* 댓글 입력 폼 */}
      <Card className='mb-4 shadow-sm border-0'>
        <Card.Body>
          <Form onSubmit={''}>
            <Form.Group className='mb-3'>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='댓글을 입력하세요...'
                value={''}
                onChange={''}
              />
            </Form.Group>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Button variant='primary' type='submit'>
                댓글 작성
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* 댓글 목록 */}

      <div className='comment-list'>
        {board.replies.map((r) => (
          <Card className='mb-3 shadow-sm border-0'>
            <Card.Body>
              <div className='d-flex align-items-center mb-2'>
                <div className='flex-grow-1'>
                  <h6 className='mb-0 fw-bold'>{r.username}</h6>
                </div>
                {r.owner ? (
                  <div>
                    <Button
                      variant='warning'
                      size='sm'
                      className='me-2'
                      onClick={() => {
                        // 수정 버튼 클릭 시 실행할 함수 작성
                        alert('수정 버튼 클릭');
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={() => {
                        // 삭제 버튼 클릭 시 실행할 함수 작성
                        // alert('삭제 버튼 클릭');
                        fetchReplyDelete(r.id);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className='mb-2'>{r.comment}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Detail;
