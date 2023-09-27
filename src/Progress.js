function Progress({index, numQuestion,points,maxpossiblepoints}) {
  return (
    <div>
      <header className="progress">
        <p>
          Questions <strong>{index}</strong> / {numQuestion} 
        </p>

        <p><strong>{points}</strong> / {maxpossiblepoints}</p>
      </header>
    </div>
  );
}

export default Progress;
