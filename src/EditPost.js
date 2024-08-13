import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from './api/posts';
import { format } from 'date-fns';
import DataContext from './context/DataContext';

const EditPost = () => {
  const { posts, setPosts, history } = useContext(DataContext);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody])

  return (
    <main className='NewPost'>
      {post &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(id)}>Edit Post</button>
          </form>
        </>
      }
      {!post &&
        <>
          <h2>Page Not Found!</h2>
          <Link to='/'>Visit Home Page</Link>
        </>
      }
    </main>
  )
}

export default EditPost