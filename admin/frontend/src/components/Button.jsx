import React from 'react'

const Button = ({ children, handleClick, handleCss }) => {
  return (
    <button onClick={handleClick} className={`bg-accent py-1 px-4 font-semibold rounded-md text-secondary transition-all hover:bg-primary ${handleCss}`}>{children}</button>
  )
}

export default Button
