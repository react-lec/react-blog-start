import axios from 'axios';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ReplyItem(props) {
  const { reply, notifyDeleteReply } = props;
  const jwt = useSelector((state) => state.jwt);

  async function deleteReply(replyId) {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/api/replies/${replyId}`,
      headers: {
        Authorization: jwt,
      },
    });
    notifyDeleteReply(replyId);
  }

  return (
    <Card className='mb-3 shadow-sm border-0'>
      <Card.Body>
        <div className='d-flex align-items-center mb-2'>
          <div className='flex-grow-1'>
            <h6 className='mb-0 fw-bold'>{reply.username}</h6>
          </div>
          {reply.owner && (
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
                  deleteReply(reply.id);
                }}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
        <p className='mb-2'>{reply.comment}</p>
      </Card.Body>
    </Card>
  );
}
