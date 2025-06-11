import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts';
import Home from './components/Home';
import Post from './components/Post';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router >
  );
}

export default App;
