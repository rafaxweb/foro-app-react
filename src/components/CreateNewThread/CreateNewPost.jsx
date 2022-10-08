import React, { useState } from 'react'
import { RetrieveBannedWords } from '../../services/BannedWords/RetrieveBannedWords'
import { createNewPostDB } from '../../services/Post/createNewPostDB'
import { retrievePosts } from '../../services/Post/RetrievePost'
// import './CreateNewPost.css'

export function CreateNewPost(props) {

	const [category, setCategory] = useState("doubt")
	const [visibilidad, setVisibilidad] = useState(true)
	const [Bannedwords, setBannedWords] = useState(false)
	const [duplicatedPosts, setDuplicatedPosts] = useState(false)
	const [mensajeEnviado, setMensajeEnviado] = useState(false)
	const [body, setBody] = useState("")
	const [image, setImage] = useState("")

	const onChangeBody = (e) => {
		setBody(e.target.value);
	}

	const onselectVisibility = (e) => {
		setVisibilidad(e.target.value);
	}

	const onselectBannedWords = (e) => {
		setBannedWords(e.target.value);
	}

	const onSelectCategory = (e) => {
		setCategory(e.target.value);
	}

	const onChangeImageUrl = (e) => {
		setImage(e.target.value);
	}

	const onSubmitForm = async (e) => {
		e.preventDefault();
		
		let Banned = await RetrieveBannedWords();

		let finalImage = "";

		if (image.length === 0) {
			switch (category) {
				case "doubt":
					finalImage = "https://img.icons8.com/office/344/ask-question.png"
					break;
				case "suggestion":
					finalImage = "https://img.icons8.com/color-glass/344/portable-speaker2.png"
					break;
				case "clarification":
					finalImage = "https://img.icons8.com/color/344/pencil-tip.png"
					break;
			
				default:
					finalImage = "prueba"
					break;
			}
		}

		const newPost =     {
			"idPost": Math.max,
			"description": body,
			"category": category,
			"image": finalImage,
			"thread": {
					"idThread": props.idThread
			},
			"public": visibilidad
		}

		let containsBanned = false
		Banned.map( (actualBanned) => {
			if(body.includes(actualBanned.word)){
				setBannedWords(true);
				setMensajeEnviado(false)
				containsBanned = true
				return
			}
		})

		let posts = await retrievePosts(props.idThread);
		
		for(let i=0; i<posts.length; i++){
			if((posts[i].description === newPost.description) ){
				setDuplicatedPosts(true)
				return
			}
		}
		
		createNewPostDB(newPost)
				setMensajeEnviado(true)
				setBannedWords(false)
				window.location.reload()
		
	}
  
	return (
		<form action="" onSubmit={onSubmitForm}>
			<div>
				<label className='' htmlFor="">Cuerpo</label>
				<textarea name="" id="" cols="30" rows="10" value={body} onChange={onChangeBody}></textarea>
			</div>
			<div>
				<label htmlFor="">Categoría</label>
				<select value={category} onChange={onSelectCategory}>
					<option value="doubt" >Duda</option>
					<option value="suggestion">Sugerencia</option>
					<option value="clarification">Clarification</option>
				</select>
			</div>
			<div>
				<label htmlFor="">Imagen (url)</label>
				<input type="text" value={image} onChange={onChangeImageUrl} />
			</div>
			<div>
				<label htmlFor="">Visibilidad</label>
				<select value={visibilidad} onChange={onselectVisibility}>
					<option value="true">Publico</option>
					<option value="false">privado</option>
				</select>
			</div>
			<>
			{Bannedwords ? <p> Se han encontrado palabras baneadas </p> : ''}
			{mensajeEnviado ? <p> Mensaje enviado </p> : ''}
			{duplicatedPosts ? <p> Ya existe un post idéntico en este thread </p> : ''}
			</>
			<button>Enviar</button>
		</form>
	)
}
