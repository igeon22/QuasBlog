import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SimpleLink from "./SimpleLink"

function HomeLogged(props){
	const navigate = useNavigate()

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

	return(
		<div>
			<header>
				<h1 className="main-title"><span className="title-b-col">Quath</span>Blog</h1>
				<nav className="nav-btns">
					<div className="s-b">
					</div>
					<div className="other-btns">
						<select className="nav-btn user" name="selection" id="" onClick={handleClick}>
							<option className="ls" value="none">None</option>
							<option className="ls" value="create">Create Blog</option>
							<option className="ls" value="home">Home</option>
						</select>
					</div>
				</nav>
			</header>
			<p className="title b">Feed</p>
			<div className="all-blocks">
			{props.data.map((item)=>{
				return(
					<SimpleLink  key={Math.random()*10000} setActualId={props.setActualId} image={item.image} title={item.title} id={item.id}></SimpleLink>
				)
			})}
			</div>
		</div>
	)
}

export default HomeLogged