import React, { useEffect } from 'react';
import getAllPosts from './utils/api';

function App() {
  useEffect(() => {
  getAllPosts()
      .then((res) => console.log(res));
  }, []);
  return (
    <main>
      <h1>Testing axios calls with ts</h1>
   </main>
  );
}

export default App;
