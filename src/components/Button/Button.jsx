import React from 'react'
import './button.css'

export default props =>
 <button onClick={() => props.click(props.name)} id={props.id} type={props.type} className= {'btn ' + props.style}>
     {props.title}
 </button>

