import styled from 'styled-components';

export const PostCardContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  background-color: #444444;
  color: white;
  border-radius: 0.5em;
  padding: 1em 1vw 1em 1vw;
  header {
    display: flex;
    flex-direction: row;
    border-bottom: solid #f2f3f4 0.1em;
    img {
      height: 3em;
      width: 3em;
      cursor: pointer;
      border-radius: 10em;
      margin: 0.5rem;
    }
    textarea {
      resize: none;
      width: 95%;
      cursor: pointer;
      border: none;
      background: none;
      font-family: 'Quicksand', sans-serif;
      font-size: 1rem;
    }
  }
  main {
    margin-top: 0.5em;
    button {
      cursor: pointer;
      background: none;
      border: none;
      margin-right: 1em;
      color: #da0037;
    }
  }
`;
export default {};
