import React from 'react'
import './Button.css'

export default props => {
    let styleCls = 'button ';
    styleCls += props.class
    return (
        <button
        onClick = { e => props.click && props.click(props.label)}
         className={styleCls}>
         {props.label}
         </button>
    )
}
