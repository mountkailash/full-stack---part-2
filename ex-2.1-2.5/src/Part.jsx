import React from "react";
import ReactDOM from "react-dom/client";


const Part = ({course, exercises}) => {
    

    return (
        <>
        <div>
            <p>
                {course} {exercises}
            </p>
            
        </div>
        </>
    )
}

export default Part