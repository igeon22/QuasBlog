import { useNavigate } from "react-router-dom"

function Log(props){
	const navigate = useNavigate()

	const handleClick=(e)=>{
		e.preventDefault()
		if(e.target.value === "home"){
			props.getFeed()
			navigate('/')
		}
		else if(e.target.value === "create"){
			navigate("/create-section")
		}
	}
	return(
		<select className="nav-btn user" name="selection" id="" onClick={handleClick}>
			<option className="ls" value="none">None</option>
			<option className="ls" value="create">Create article</option>
			<option className="ls" value="home">Home</option>
		</select>
	)
}

export default Log