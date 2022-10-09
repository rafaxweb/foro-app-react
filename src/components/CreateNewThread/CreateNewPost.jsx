import React, { useState } from 'react'
import { RetrieveBannedWords } from '../../services/BannedWords/RetrieveBannedWords'
import { createNewPostDB } from '../../services/Post/createNewPostDB'
import { retrievePosts } from '../../services/Post/RetrievePost'
import './CreateNewPost.css'
import '../../css/Common.css'

export function CreateNewPost(props) {

	const [visibilidad, setVisibilidad] = useState(true)
	const [Bannedwords, setBannedWords] = useState(false)
	const [duplicatedPosts, setDuplicatedPosts] = useState(false)
	const [mensajeEnviado, setMensajeEnviado] = useState(false)
	
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [category, setCategory] = useState("doubt")
	const [image, setImage] = useState("")

	const onChangeTitle = (e) => {
		setTitle(e.target.value)
	}

	const onChangeBody = (e) => {
		setBody(e.target.value);
	}

	const onselectVisibility = (e) => {
		setVisibilidad(e.target.value);
	}

	const onSelectCategory = (e) => {
		setCategory(e.target.value);
	}

	const onChangeImageUrl = (e) => {
		setImage(e.target.value);
	}

	const onSubmitForm = async (e) => {
		e.preventDefault();

		setBannedWords(false);
		setMensajeEnviado(false)
		setDuplicatedPosts(false)
		
		let finalImage = "";
		
		if (image.length === 0) {
			switch (category) {
				case "doubt":
					finalImage = "../../media/doubt.png"
					break;

				case "suggestion":
					finalImage = "../../media/suggestion.png"
					break;

				case "clarification":
					finalImage = "../../media/clarification.png"
					break;
				
				default:
					finalImage = "prueba"
					break;
			}
		}
						
		
		const newPost =     {
			"idPost": Math.max,
			"title": title,
			"description": body,
			"category": category,
			"image": finalImage,
			"thread": {
					"idThread": props.idThread
			},
			"public": visibilidad
		}

		const banned = await RetrieveBannedWords();
		let containsBanned = false
		banned.map( (actualBanned) => {
			if (title.toLocaleUpperCase().trim().includes(actualBanned.word.toUpperCase()) || 
			newPost.description.toLocaleUpperCase().trim().includes(actualBanned.word.toUpperCase()) ){
				
				setBannedWords(true);
				setMensajeEnviado(false)
				containsBanned = true
				return
			}
		})

		let posts = await retrievePosts(props.idThread);
		
		for(let i=0; i<posts.length; i++){
			if((posts[i].title === newPost.title) ){
				setDuplicatedPosts(true)
				return
			}
		}
		
		createNewPostDB(newPost)
				setMensajeEnviado(true)
				setBannedWords(false)
				setTimeout( () => {
					window.location.reload()
				}, 1000 ) 
		
	}
  
	return (
		<>
			<h2>Nueva publicación</h2>
			<form className='form' onSubmit={onSubmitForm}>
				<div className='form__left-column'>
					<div className='form-block'>
						<label className='form-block__label' htmlFor='title'>Título</label>
						<input className='form-block__input' id='title' type='text' value={title} onChange={onChangeTitle}/>
					</div>
					<div className='form-block'>
						<label className='form-block__label' htmlFor="">Cuerpo</label>
						<textarea className='form-block__input' name="" id="" cols="30" rows="10" value={body} onChange={onChangeBody}></textarea>
					</div>
				</div>
				<div className='form__right-column'>
					<div className='form-block'>
						<label className='form-block__label' htmlFor="">Categoría</label>
						<select className='form-block__input' value={category} onChange={onSelectCategory}>
							<option value="Duda" >Duda</option>
							<option value="Sugerencia">Sugerencia</option>
							<option value="Clarificación">Clarification</option>
						</select>
					</div>
					<div className='form-block'>
						<label className='form-block__label' htmlFor="">Imagen (url)</label>
						<input className='form-block__input' type="text" value={image} onChange={onChangeImageUrl} />
					</div>
					<div className='form-block'>
						<label className='form-block__label' htmlFor="">Visibilidad</label>
						<select className='form-block__input' value={visibilidad} onChange={onselectVisibility}>
							<option value="true">Publico</option>
							<option value="false">Privado</option>
						</select>
					</div>
				</div>
			</form>
			{mensajeEnviado ? <p className='accepted-message'> Mensaje enviado </p> : ''}
			{Bannedwords ? <p className='error-message'> Se han encontrado palabras baneadas </p> : ''}
			{duplicatedPosts ? <p className='error-message'> Ya existe un post idéntico en este thread </p> : ''}
			<button className='form-buttom' onClick={onSubmitForm}>Enviar</button>
		</>
	)
}
