import React from 'react'
import './button.css'

export default props =>
 <button id={props.id} type={props.type} className= {'btn ' + props.style}>
    {props.title}
 </button>

