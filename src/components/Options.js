import React from 'react'

export default function Options({ questions,  dispatch, answer }) {

   const hasanswered = answer !== null;

    return (
        <div className="options">
            {questions.options.map( (option, index) =>
             <button 
             disabled={hasanswered} 
             className={`btn btn-option ${index === answer ? "answer" : ""} ${hasanswered ? index===questions.correctOption ? 'correct' : "wrong" : ""}`} 
             onClick={()=> dispatch({type: "newAnswer", payload: index})}  
             key={option}>{option}</button>)}
        </div>
    )
}
