import { useNavigate } from "react-router-dom"
import SimpleLink from "./SimpleLink"
import Log from "./Log"
import Nolog from "./Nolog"
import { useEffect, useState } from "react"

function Home(props){
	const navigate = useNavigate()
	const [actual,setActual] = useState(null)
	const [logTxt,setLogTxt] = useState("")

	const loginPressed=(e)=>{
		e.preventDefault()
		navigate('/login')

	}

	useEffect(()=>{
		update()

	},[props.logged])

	const update =()=>{
		if(props.logged===true){
			setActual(<Log getFeed={props.getFeed}></Log>)
			setLogTxt(`Welcome,  ${props.usernames}`)
		}
		else{
			setActual(<Nolog ></Nolog>)
			setLogTxt(`Feed`)
		}
	}

	const refresh=(e)=>{
		e.preventDefault()
		props.setRf(Math.random()*100000)
		// console.log("jj")
	}

	const signupPressed=(e)=>{
		e.preventDefault()
		navigate('/sign-up')
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
					<div className="other-btns">{actual}</div>
				</nav>
			</header>
			<p className="title b">{logTxt}</p>
			<div className="ref-cont">
				<button className="nav-btn user sp" onClick={refresh}>Refresh</button>

			</div>
			<div className="all-blocks">{props.data.map((item)=>{
				return(
					<SimpleLink  key={Math.random()*10000}  image={item.image} setActualId={props.setActualId} title={item.title} id={item.id}></SimpleLink>
				)
			})}</div>
		</div>
	)
}

export default Home