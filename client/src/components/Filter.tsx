import React, { ChangeEvent, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getPostByCategory, getAllPosts } from '../store/PostSlice';
import { Category } from '../types/types';
import { AppDispatch } from '../store';

const StyledFilter = styled.section`
  height: 150px;
  width: 25vw;
  margin: 2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  & label {
    font-size: 1.1rem;
  }
  & select {
    width: 250px;
    height: 35px;
    font-size: 1.1rem;
    margin: 0.5rem;
    text-align: center;
    border-radius: 5px;
  }
  & button {
    width: 250px;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    background: #da0037;
    color: #ededed;
    font-size: 1.1rem;
    cursor: pointer;
  }
  @media (max-width: 576px) {
    height: 100px;
    & button {
      width: 250px;
      font-size: 0.75rem;
      margin 0;
    }
    & select {
      width: 250px;
      height: 30px;
      font-size: 0.75rem;
      margin: 10px 0;
    }
  }
  @media (max-width: 768px) {
    & select, button {
      width: 300px;
    }
  }
`;

function Filter({ data }: any) {
  const dispatch: AppDispatch = useDispatch();
  const [category, setCategory] = useState<string>();
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  const changeCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category === '') {
      dispatch(getAllPosts());
    } else {
      dispatch(getPostByCategory({ category }));
    }
  };
  return (
    <StyledFilter>
      <form onSubmit={changeCategory}>
        <label htmlFor="category">
          <select
            value={category}
            id="category"
            onChange={handleChange}
          >
            <option value="">none</option>
            {data.map(({ category: theCategory }: Category) => (
              <option key={uuidv4()} value={theCategory}>
                {theCategory}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">View Category</button>
      </form>
    </StyledFilter>
  );
}

export default Filter;
