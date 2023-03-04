import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import data from "../data"
import { app,database } from '../firebaseConfig';
import {collection,addDoc, getDocs,doc,updateDoc} from 'firebase/firestore'


function Post(props){
	const [dt,setData] = useState([])
	const [datas,setDatas] = useState([])
	const [image,setImage] = useState(null)
	let url = ""
	const collectionRefFeed = collection(database,'feed')
	const [navValue,setNavValue] = useState("")
	const navigate = useNavigate()
	let {id} = useParams()
	var feed = []

	const getFeed=()=>{
		setDatas([])
		getDocs(collectionRefFeed)
		.then((response)=>{
			response.docs.map((item)=>{
				let dat = item.data()
				feed.push(dat["singleFeed"])
				setDatas(feed)
				// console.log("dubdu: ",datas);
			})

		})
		// console.log("FEED",feed);
	}
	useEffect(()=>{
		getFeed()
		// console.log("id: ",id)
		// console.log(datas)
	},[])
	
	useEffect(()=>{
		setData(dt.concat(datas))
		// console.log("Looonn");
		// console.log("dgg:",feed);
		datas.map((item)=>{
			// console.log("DATA: ",item.id);
			// console.log(props.actualId);
			if(item.id == id){
				// console.log("Found!");
				// console.log(item);
				setData(item)
				setImage(require(`${item.image}`))
			}
		})

	},[datas])

	const handleClick=(e)=>{
		if(e.target.value==="home" && props.logged=== false){
			navigate('/')
		}
		else if(e.target.value==="home" && props.logged=== true){
			navigate('/')
		}
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
							{/* <option className="ls" value="create">Create Blog</option> */}
							<option className="ls" value="home">Home</option>
						</select>
					</div>
				</nav>
			</header>
			<h2 className="category">Category: {dt.category}</h2>
			<h3 className="title">{dt.title}</h3>

			<div className="img-container">
				<img className="imgs"  src={image}  alt=""/>
			</div>

			<p className="tag">{dt.tags}</p>
			<p className="author">Published by <span className="author-name">{dt.author}</span> </p>
			<div className="blog-container">
				<p className="text">{dt.content}</p>

			</div>
			<p className="end">Created by Igeon22</p>
		</div>
	)
}

export default Post