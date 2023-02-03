import React from "react"

function Button(props) {
    const { name, className, handleClick } = props
    return (
        <button
            className={className}
            onClick={handleClick}>
            {name}
        </button>
    )
}

export default Button