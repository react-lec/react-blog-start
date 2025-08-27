import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, Pagination } from 'react-bootstrap';
import BoardItem from '../../components/BoardItem';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  useEffect(() => {
    if (keyword) {
      // 검색어 있을 때는 디바운스
      const handler = setTimeout(() => {
        apiHome();
      }, 500);

      return () => clearTimeout(handler);
    } else {
      // 검색어 없으면 즉시 실행 (페이지 이동 같은 경우)
      apiHome();
    }
  }, [page]);

  async function apiHome() {
    let response = await axios({
      method: 'get',
      url: `http://localhost:8080?page=${page}&keyword=${keyword}`,
    });

    setModel(response.data.body);
  }

  function prev() {
    setPage(page - 1);
  }
  function next() {
    setPage(page + 1);
  }

  function changeValue(e) {
    setKeyword(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      {keyword}
      <Form className='d-flex mb-4' onSubmit={''}>
        <FormControl
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
          value={keyword}
          onChange={changeValue}
        />
      </Form>

      {model.boards.map((board) => (
        <BoardItem
          key={board.id}
          id={board.id}
          title={board.title}
          page={page}
        />
      ))}

      <br />
      <div className='d-flex justify-content-center'>
        <Pagination>
          <Pagination.Item onClick={prev} disabled={model.isFirst}>
            Prev
          </Pagination.Item>

          <Pagination.Item onClick={next} disabled={model.isLast}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
