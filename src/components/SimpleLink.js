import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function SimpleLink(props){
	const navigate = useNavigate()
	const [image,setImage] = useState(null)
	const src = props.image

	const style = {
		color:"black",
		textDecoration:"none"
	}

	// useEffect(()=>(
	// 	setInterval(() => {
			
	// 		setImage(require(`${src}`))
	// 	}, 2000)
	// ),[props.image])

	const handleClick=(e)=>{
		e.preventDefault()
		props.setActualId(props.id)
		navigate(`/article`)
		// console.log(typeof props.image);
	}
	
	return(
		<div className="block-container">
			<div className="b-img-cont">
				<img className="imgs modified" src={src} alt=""/>
			</div>

			<p className="block-title">{props.title}</p>
			<Link style={style} to={`article/${props.id}`} className="read-btn"> Read More...</Link>
		</div>
	)
}

export default SimpleLink