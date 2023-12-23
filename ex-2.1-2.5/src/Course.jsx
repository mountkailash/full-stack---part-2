import React from "react";
import { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";


const Course = ({course}) => {



    return(
        <>
        <h1>Web development curriculum</h1>
        {course.map((individualCourse) => (
            <div key={individualCourse.id}>
                <Header course = {individualCourse} />
                <Content  parts = {individualCourse.parts}/>
                <Total parts = {individualCourse.parts}/>
            </div>
        ))}
        
        
        </>
    )
}

export default Course