import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({ posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

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