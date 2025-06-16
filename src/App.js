import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts';
import Home from './components/Home';
import Post from './components/Post';
import Formular from './components/Formular';
import { useState } from 'react';

function App() {
  const [toggleBtnFormular, setToggleBtnFormular] = useState(false)

  const openFormularNewPost = () => {
    setToggleBtnFormular(true)
  }

  const closeFormularNewPost = () => {
    setToggleBtnFormular(false)
  }

  return (
    <Router>
      <Header />
      <div className='btn_container'>
        <button onClick={openFormularNewPost}>Create New Post</button>
        {toggleBtnFormular && <button onClick={closeFormularNewPost}>Close Formular</button>}
      </div>


      {
        toggleBtnFormular && <Formular />
      }
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router >
  );
}

export default App;
