import React from "react";
import ReactDOM  from "react-dom/client";
import Part from "./Part";





const Content = (props) => {
    
    const {parts} = props;
    console.log({parts})

    return (
        <>
        <div>
            {parts.map((part) => (
                <Part key = {part.id} course = {part.name} exercises={part.exercises} />
            ))}


            {/* <Part course = {parts[0].name} exercises = {parts[0].exercises} />
            <Part course = {parts[1].name} exercises = {parts[1].exercises} />
            <Part course = {parts[2].name} exercises = {parts[2].exercises} /> */}
        </div>
        </>
    )
}

export default Content