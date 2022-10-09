import React, { useState } from 'react'
import { CreateNewPost } from '../CreateNewThread/CreateNewPost'
import './Thread.css'

export default function Thread(props) {

  const [createPostVisible, setCreatePostVisible] = useState(false)

  const onChangeVisible = () => {
    setCreatePostVisible(!createPostVisible);
  }

  return (
    <div className='thread'>

      <div className='thread__thread'>
        <div className='thread-info'>
          <img src={props.image} className='thread-info__info__image' />
          <div className='thread-info__right'>
            <p className='thread-info__right__title'>{props.title}</p>
            <p className='thread-info__right__number'>Publicaciones: {props.postsNumber}</p>
            {props.threads.length === 1 ? <button className='thread-info__right__button' onClick={onChangeVisible}>Nueva publicación</button> : ""}
          </div>
        </div>
        {createPostVisible ? (<div><CreateNewPost idThread={props.idThread} /></div>) : "" }
      </div>
    </div>
  )
}
