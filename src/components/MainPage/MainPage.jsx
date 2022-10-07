import React, { useEffect, useState } from 'react'
import { retrievePosts } from '../../services/Post/RetrievePost'
import { retrieveUserPassword } from '../../services/User/retrieveUserPassword'
import { RetrieveThreads } from '../../services/Thread/RetrieveThreads'
import AllPosts from '../AllPosts/AllPosts'
import Login from '../Login/Login'
import Thread from '../Thread/Thread'
import './MainPage.css'

export function MainPage() {
  
  const [threads, setThreads] = useState([{title: "a", date:"10"}])
  const [LoginVision, setLoginVision] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
  
    return async() => {
      const threads = await RetrieveThreads()
      setThreads(threads)
    }
  }, [])
  
  function SetVisibilidad(){

    setLoginVision(!LoginVision)
  }

  async function onClickThread(id) {
    const tempPosts = await retrievePosts(id);  
    // setPosts(tempPosts)
    TestLogin(tempPosts)
  }

  async function TestLogin(posts) {
    
    let passw = localStorage.getItem("password")
    let usern = localStorage.getItem("username")
    const originalPaswword = await retrieveUserPassword(usern);

    if(passw == originalPaswword){
      setPosts(posts);
    }
    else {
      const tempArray = posts.filter( (actualPost) => {
        return actualPost.public;
      })
      setPosts(tempArray);
    }
    
  }

  return (
    <>
      {LoginVision ? 
        (<div className='main-page__login'>
          <Login SetVisibilidad={SetVisibilidad}></Login> 
        </div>) : '' }
      <button onClick={SetVisibilidad}>Iniciar sesion</button>
      <h1>Foro</h1>
      <p>CLick en un thread para mostrar los posts</p>
      {threads.map( (thread) => { 
        return (
          <div className='thread-buttom' onClick={ () => onClickThread(thread.idThread)} key={thread.idThread} >
            <Thread idThread={thread.idThread} title={thread.title} date={thread.date} />
          </div>
        )
      } )}
      <AllPosts posts={posts}/>
    </>
  )
}
