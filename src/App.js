import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import HomeLogged from './components/HomeLogged';
// import data from './data';
import Post from './components/Post';
import Creator from './components/Creator';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { app,database } from './firebaseConfig';
import {collection,addDoc, getDocs,doc,updateDoc} from 'firebase/firestore'



// Local path: 3D Objects\DEV\QuathBlog

function refresh(){
	window.setInterval(()=>{
		const collectionRefFeed = collection(database,'feed')
		let feed = []
			getDocs(collectionRefFeed)
			.then((response)=>{
				response.docs.map((item)=>{
					let dat = item.data()
					feed.push(dat["singleFeed"])
					console.log("du: ",feed);
				})
				return feed
	
			})

	},1000)

}


function App(){
	const [actualId,setActualId] = useState('')
	const [datas,setDatas] = useState([])
	const collectionRef = collection(database,'users')
	const collectionRefFeed = collection(database,'feed')
	const [logged,setLogged] = useState(false)
	const [rf,setRf] = useState(0)
	const [canNavigate,setCanNavigate] = useState(false)
	const [usernames,setUsernames] = useState("")

	

	const getData=(email,password)=>{
		// console.log(usersInfos);
		getDocs(collectionRef)
		.then((response)=>{
			response.docs.map((item)=>{
				// console.log("\n--------");
				// console.log("ITEM: ",item)
				let dat = item.data()
				// console.log(dat);
				// console.log('DATA: ',dat.email,dat.password)
				// console.log('UsersDATA: ',usersInfos.email,usersInfos.password)
				if(dat.email == email && dat.password == password){
					// console.log('We found it!\n');
					// console.log('\nname: ',dat.name)
					setUsernames(dat.name)
					window.setTimeout(()=>{
						setCanNavigate(true)
						
					},1000)
					
					
					// setDi(item.id)
					// id = item.id
					
					// console.log(userId);
				}
			})
			
			// console.log(response.docs.map((item)=>{
			// 	return item.id
			// }))
		})
	}

	useEffect(()=>{
		getFeed()
	},[])


	useEffect(()=>{
		getFeed()
	},[rf])

	const getFeed=()=>{
		let feed = []
		setDatas([])
		getDocs(collectionRefFeed)
		.then((response)=>{
			response.docs.map((item)=>{
				let dat = item.data()
				feed.push(dat["singleFeed"])
				setDatas((feed))
				// console.log("dubdu: ",datas);
			})

		})
		// console.log("FEED",feed);
	}

	return(
		<HashRouter>
			<Routes>
				<Route path='/' element={<Home usernames={usernames} getFeed={getFeed} setRf={setRf} setActualId={setActualId} data={datas} logged={logged}></Home>}></Route>
				{/* <Route path={`/article`} element={<Post logged={logged} data={data} actualId={actualId}></Post>} ></Route> */}
				<Route exact path={'/article/:id'}  element={<Post  id={':id'} logged={logged} data={datas} actualId={actualId}></Post>} ></Route>
				<Route exact path='/create-section' element={<Creator getFeed={getFeed}  usernames={usernames} data={datas} setDatas={setDatas} logged={logged}></Creator>}></Route>
				<Route exact path='/home' element={<HomeLogged  setActualId={setActualId} data={datas} logged={logged}></HomeLogged>}></Route>
				<Route exact path='/login' element={<Login getData={getData} canNavigate={canNavigate} logged={logged} setLogged={setLogged}></Login>}></Route>
				<Route exact path='/sign-up' element={<SignUp setDatas={setDatas}></SignUp>}></Route>
			</Routes>
		</HashRouter>
	)
}

export default App