import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { app,database} from '../firebaseConfig'

function Login(props){
	const [text,setText] = useState("")
	const [infos,setInfos] = useState({email:"",password:""})
	let navigate = useNavigate()
	let auth = getAuth()

	const handleSign =(e)=>{
		
		e.preventDefault()
		setText("Please wait a moment...")
		signInWithEmailAndPassword(auth,infos["email"],infos["password"])	
		.then((result) => {
			setText("Logged successfully!")
			props.setLogged(true)
			// navigate("/")
			
			
		}).catch((err) => {
			setText("Password or Email is incorrect")
		
		})
		props.getData(infos["email"],infos["password"])
	}

	useEffect(()=>{
		if(props.canNavigate === true){
			navigate("/")
		}
	},[props.canNavigate])

	const handleChanges =(e)=>{
		let dt = infos
		// console.log(e.target.value);
		dt[e.target.name] = e.target.value
		setInfos(dt)
		// console.log(infos);


	}
	return(
		<div className='upper-cont'>
			<div className="sign-cont">
				<form action="" className="">
					<label className="lb"  htmlFor="mail">Mail</label>
					<input className="field" type="email" onChange={handleChanges} name="email" id="mail" required/>
					<label className="lb"   htmlFor="password">Password</label >
					<input className="field" type="password" onChange={handleChanges} name="password" id="password" required/>
					<p className="alert-text">{text}</p>
					<button className="submit-btn lg" onClick={handleSign} type="submit">Log In</button>
				</form>
			</div>
		</div>
	)
}

export default Login