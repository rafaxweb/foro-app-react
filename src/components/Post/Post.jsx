import React from 'react'
import './Post.css'

export function Post({ posts }) {
  return (
    
    <div className='post'>
      <div className='post__left'>
        <img className='imagen-consulta' src={posts.image} />
        <p className='post__left__category'>{posts.category}</p>
      </div>
      <div className='post__right'>
        <h3 className='post__right__title'>{posts.title}</h3>
        <p className='post__right__description'>{posts.description}</p>
      </div>
    </div>
    
  )
}
