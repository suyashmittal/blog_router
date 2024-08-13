import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';

const PostPage = () => {
    const { posts, setPosts, history } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const filteredPosts = posts.filter(post => (post.id !== id));
            setPosts(filteredPosts);
            history.push('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Page Not Found!</h2>
                        <Link to='/'>Visit Home Page</Link>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage