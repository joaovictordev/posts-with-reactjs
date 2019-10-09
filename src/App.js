import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

function App() {
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const { data: posts} = await api.get('/posts')

      setPosts(posts)
    }

    loadPosts()
  }, [])

  async function handleSave(e){
    e.preventDefault()

    //desestruturando o atributo data da resposta e atribuindo esse a uma variavel chamada post
    const { data: post} = await api.post('/posts', {
      content: newPostContent
    })

    setPosts([...posts, post])
    setNewPostContent('')
  }

  return (
    <div className="App">
      <form onSubmit={handleSave}>
        <textarea 
          onChange={e => setNewPostContent(e.target.value)}
          value={newPostContent}
        />
        <button type="submit">Postar</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id} >{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
