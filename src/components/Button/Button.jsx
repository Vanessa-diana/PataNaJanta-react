import React from 'react'
import './button.css'

export default props =>
 <button id={props.id} value={props.value} type={props.type} className= {'btn ' + props.style}>
    {props.title}
 </button>

