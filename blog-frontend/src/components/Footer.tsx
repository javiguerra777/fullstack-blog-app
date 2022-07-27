import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineGif,
} from 'react-icons/ai';
import { BsFileEarmarkPlus } from 'react-icons/bs';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: auto;
  background-color: white;
  border-radius: 0.5em;
  padding: 1em 0.5em 1em 0.5em;
  header {
    display: flex;
    flex-direction: row;
    border-bottom: solid #f2f3f4 0.1em;
    img {
      height: 3em;
      width: 3em;
      cursor: pointer;
      border-radius: 10em;
      margin-right: 0.5em;
    }
    textarea {
      resize: none;
      width: 95%;
      cursor: pointer;
      border: none;
      background: none;
    }
  }
  main {
    margin-top: 0.5em;
    button {
      cursor: pointer;
      background: none;
      border: none;
      margin-right: 1em;
    }
  }
`;
function Footer() {
  // const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setImage(URL.createObjectURL(e.target!.files![0]));
  // };
  const createNewPost = () => {
    console.log('creating new post...');
  };
  // const [image, setImage] = useState('');
  // const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setImage('hello');
  // };
  // const submitPost = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const post: PostParams = {
  //     username: 'admin',
  //     date: Date.now(),
  //     category: 'miscellaneous',
  //     title: 'Testing AWS',
  //     body: 'Set up AWS to handle images with MONGODB',
  //     image,
  //   };
  //   await addNewPost(post);
  // };
  return (
    <FooterWrapper>
      {/* <form onSubmit={submitPost}>
        <label htmlFor="image">
          <input
            type="file"
            name="image"
            id="image"
            onChange={imageHandler}
          />
        </label>
        <button type="submit">Submit Post</button>
      </form> */}
      <header>
        {/* placeholder image for styling purposes */}
        <img
          src="https://i.pinimg.com/originals/bd/99/9b/bd999b06afebf8273b9da22abbebbd45.png"
          alt="user-img"
        />
        <textarea
          name="sharePost"
          id="sharePost"
          placeholder="Share what's on your mind..."
          onClick={createNewPost}
        />
      </header>
      <main>
        <button type="button" aria-label="Photos">
          <AiOutlineCamera />
        </button>
        <button type="button" aria-label="Videos">
          <AiOutlineVideoCamera />
        </button>
        <button
          type="button"
          aria-label="Add New Post"
          onClick={createNewPost}
        >
          <BsFileEarmarkPlus />
        </button>
        <button type="button" aria-label="Add Gif">
          <AiOutlineGif />
        </button>
      </main>
    </FooterWrapper>
  );
}

export default Footer;
