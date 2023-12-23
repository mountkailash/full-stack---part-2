import React from 'react'
import ReactDOM  from 'react-dom/client'


const Header = ({course}) => {
    console.log(course)
    
    
    return (
        <>
        <div>
            <h2>{course.name}</h2>
        </div>
        </>
    )
}

export default Header