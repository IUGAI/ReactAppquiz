function StartScreen({numQestions, dispatch}){
    return (
        <div className="start">
            <h2>Welcome to The React quiz</h2>
            <h3>{numQestions}  questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={()=> dispatch({type: "start"})}>let's start</button>
        </div>
    )
}

export default StartScreen;