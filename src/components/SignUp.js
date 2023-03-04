import { app,database} from '../firebaseConfig'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {collection,addDoc} from 'firebase/firestore'

function SignUp(props){
	const [text,setText] = useState("")
	const [infos,setInfos] = useState({email:"",password:"",name:""})
	const collectionRef = collection(database,'users')
	const navigate = useNavigate()
	let auth = getAuth()
	const handleSign =(e)=>{
		e.preventDefault()
		setText("Please wait a moment...")
		createUserWithEmailAndPassword(auth,infos["email"],infos["password"])	
		.then((result) => {
			setText("Sign up successfully! redirect to Login page...")
			addDoc(collectionRef,{
				email:infos["email"],
				password:infos["password"],
				name:infos["name"]
			})
			.then((result)=>{
				// console.log("Account created success...");
				navigate('/login')
			})
			
		}).catch((err) => {
			setText("Password or Email is incorrect")
		
		})
	}

	const handleChanges =(e)=>{
		let dt = infos
		// console.log(e.target.value);
		dt[e.target.name] = e.target.value
		setInfos(dt)
		// console.log(infos);


	}
	return(
		<div className="upper-cont">
			<div className="sign-cont">
				<form action="" className="">
					<label className="lb" htmlFor="name">Username</label>
					<input className="field" type="text" name="name" onChange={handleChanges} id="name" minLength={5} required/>
					<label className="lb"  htmlFor="mail">Mail</label>
					<input className="field" type="email" name="email" id="mail" onChange={handleChanges}   required/>
					<label className="lb"  htmlFor="password">Password</label >
					<input className="field" type="password" name="password"  id="password" onChange={handleChanges}  minLength={5} required/>
					<p className="alert-text">{text}</p>
					<button className="submit-btn" onClick={handleSign} type="submit">Sign-In</button>
				</form>
			</div>
		</div>
	)
}

export default SignUp