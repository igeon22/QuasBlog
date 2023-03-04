import { useNavigate } from "react-router-dom"

function Nolog(props){
	const navigate = useNavigate()

	const loginPressed=(e)=>{
		e.preventDefault()
		navigate('/login')

	}

	const signupPressed=(e)=>{
		e.preventDefault()
		navigate('/sign-up')
	}
	return(
		<div>
			<button className="nav-btn user" onClick={loginPressed} >Log in</button>
			<button className="nav-btn user" onClick={signupPressed}>Sign Up</button>
		</div>
	)
}

export default Nolog