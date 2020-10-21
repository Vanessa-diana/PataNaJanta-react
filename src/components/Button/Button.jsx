import React from 'react'
import './button.css'

export default props =>
 <button className= {'btn ' + props.style}>
     {props.title}
 </button>