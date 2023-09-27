function NextButton({dispatch, answer, index, numQestions}) {
   if (answer === null) return null;

   if (index < numQestions - 1 ) 
    return (
        <button className="btn btn-ui" onClick={()=> dispatch({type: "nextQuestion"})}>
              Next
        </button>
    )

    if (index === numQestions - 1) 
    return (
        <button  className="btn btn-ui" onClick={() => dispatch({type : "finish"})}>
            finish
        </button>
    )
}

export default NextButton
  