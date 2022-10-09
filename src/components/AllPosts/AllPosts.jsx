import React from 'react'
import './AllPosts.css'
import { useEffect, useState } from 'react'
import { retrievePosts } from '../../services/Post/RetrievePost'
import { Post } from '../Post/Post'

export default function AllPosts({posts}) {
  return (
    <div className='posts-list'>
      <h2>Lista de posts del thread</h2>
      <div className='posts'>
        {posts.map( (actualPost) => {
          return (
            <Post key={actualPost.idPost} posts={actualPost}/>
          )
        } )}

      </div>
    </div>
  )
}
