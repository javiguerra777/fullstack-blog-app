import React, { ChangeEvent, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getPostByCategory, getAllPosts } from '../store/PostSlice';

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
  }
  & button {
    width: 250px;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #000;
    background: #0f3d3e;
    color: #e2dcc8;
    font-size: 1.1rem;
    cursor: pointer;
  }
`;

type Category = {
  _id: string;
  category: string;
  username: string;
  date: number;
  __v: number;
};

function Filter() {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state: any) => state.category,
    shallowEqual,
  );
  const [category, setCategory] = useState<string>();
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  const changeCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category === '') {
      dispatch<any>(getAllPosts());
    } else {
      dispatch<any>(getPostByCategory({ category }));
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
            <option value="">-</option>
            {categories.map((categ: Category) => (
              <option key={uuidv4()} value={categ.category}>
                {categ.category}
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
