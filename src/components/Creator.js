import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { app,database} from '../firebaseConfig'
import {collection,addDoc} from 'firebase/firestore'
import { v4 } from "uuid"

function Creator(props){
	const navigate = useNavigate()
	const [form,setForm] = useState({})
	const collectionRef = collection(database,'feed')
	var dt = form 

	useEffect(()=>{
		if(props.logged===false){
			navigate('/')
		}
	},[])

	const handleClick=(e)=>{
		e.preventDefault()
		if(e.target.value === "home"){
			navigate('/home')
		}
		else if(e.target.value === "create"){
			navigate("/create-section")
		}
	}

	const handleForm=(e)=>{
		
		dt[e.target.name] = e.target.value
		dt["author"] = props.usernames
		dt["id"] = v4()
		// console.log('Name: ',e.target.name);
		// console.log('Value: ',e.target.value);
		// console.log('Dt: ',dt);
		setForm(dt)

		if(dt["category"]==="none"){
			dt["image"] = "./images-1/none3.jpg"
		}
		else if(dt["category"]==="politics"){
			dt["image"] = "./images-1/politics3.jpg"
		}
		else if(dt["category"]==="entertainment"){
			dt["image"] = "./images-1/entertainment3.jpg"
		}
		else if(dt["category"]==="news"){
			dt["image"] = "./images-1/news3.jpg"
		}
		else if(dt["category"]==="science"){
			dt["image"] = "./images-1/science3.jpg"
		}
		else if(dt["category"]===undefined || dt["category"]===null){
			dt["image"] = "./images-1/none3.jpg"
			dt["category"] = "none"
		}

		
	}

	const publish=(e)=>{
		if(dt["title"]!=null && dt["title"]!="" && dt["title"]!=undefined){
			if(dt["content"]!=null && dt["content"]!="" && dt["content"]!=undefined){
				e.preventDefault()
				let d = props.data
				d = d.push(form)
				// props.setDatas(d)
				addDoc(collectionRef,{
					singleFeed:form,
				})
				.then((result)=>{
					// console.log("Document Updated...");
					navigate('/')
					
				})
				// console.log(" Data: ",props.data);
			
			}
		}
	}

	const quit=(e)=>{
		e.preventDefault()
		navigate("/")
	}


	return(
		<div>
			
			<header>
				<h1 className="main-title"><span className="title-b-col">Quas</span>Blog</h1>
				<nav className="nav-btns">
					<div className="s-b">
						{/* <div className="search-bar-cont">
							<input className="search-bar" type="text"/>
							<button className="search-btn">Search</button>
						</div> */}
					</div>
					<div className="other-btns" >
						<select className="nav-btn user" name="selection" id="" onClick={handleClick}>
							<option className="ls" value="none">None</option>
							<option className="ls" value="create">Create article</option>
							<option className="ls" value="home">Home</option>
						</select>
					</div>
				</nav>
			</header>
			<p className="title b">Create a new article</p>

			<div className="create-section">
				<form action="" className="creator">
					<p className="b-sub-title">Main</p>
					<label className="lb-c d" htmlFor="title">Post Title</label>
					<input className="field-txt" onChange={handleForm} type="text" id="post-title" name="title" maxLength={90} required/>

		
					
					<label htmlFor="selct" className="lb-c" id="category">Category</label>
					<select  onChange={handleForm} className="field-txt opts"  name="category" id="selct" required>
						<option value="none" className="opt" >None</option>
						<option value="politics" className="opt">Politic</option>
						<option value="science" className="opt">Science</option>
						<option value="entertainment" className="opt">Entertainment</option>
						<option value="news" className="opt">News</option>
					</select>
			
					<label className="lb-c" htmlFor="tags">Tags</label>
					<input className="field-txt"  onChange={handleForm} type="text" id="tags" name="tags" required maxLength={50}/>

					<p className="b-sub-title">Content</p>
					<label className="lb-c d" htmlFor="content">Content</label>
					<textarea className="field-txt"  onChange={handleForm} name="content" id="content" cols="30" rows="10" required></textarea>

					
					{/* <input type="submit" className="end-btn"  value="Publish"></input> */}
					<div className="end-btn-container">
						<button className="end-btn" onClick={quit}>Quit</button>
					<input type="submit" className="end-btn" onClick={publish} value="Publish"></input>
					</div>

				</form>

			</div>
		</div>
	)
}

export default Creator