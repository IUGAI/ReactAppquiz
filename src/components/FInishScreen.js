  import React from 'react'
  
  export default function  finishedScreen( {points, maxpossiblepoints}) {

    const precentage = (points  / maxpossiblepoints) * 100; 
    return (
      <div>
       <p className='result '>You scored <strong>{points}</strong>out of {maxpossiblepoints}</p>
       </div>
    )
  }
  