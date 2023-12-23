import React from "react";
import ReactDOM from "react-dom/client";


const Total = (props) => {
    const {parts} = props;
    const totalExercises = parts.reduce((total, part) => {
        return total + part.exercises
    }, 0)
    console.log(totalExercises)

    return (
        <>
        <div>
            <p>Number of exercise {totalExercises}</p>
        </div>
        </>
    )
}

export default Total