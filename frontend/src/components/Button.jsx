import React from 'react'

const Button = ({ children, handleClick, handleCss }) => {
  return (
    <button onClick={handleClick} className={`bg-accent py-2 px-3 font-semibold rounded-md text-secondary transition-all hover:bg-primary ${handleCss}`}>{children}</button>
  )
}

export default Button