import React from 'react'
import './button.css'

export default props =>
 <button value = {props.value} id={props.id} type={props.type} className= {'btn ' + props.style}>
    {props.title}
 </button>

