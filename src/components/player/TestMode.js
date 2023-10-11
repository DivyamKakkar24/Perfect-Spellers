// import Loading from '../ui/Loading';
import { useState } from 'react';
import classes from './TestMode.module.css';
import Questions from './questions/Questions';
import { useSelector } from 'react-redux';
import Scorecard from './Scorecard';


const TestMode = () => {
  // const words = useSelector((state) => state.tabs.wordsFirebase);
  const showScore = useSelector((state) => state.test.showScore);
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 1);
  }

  return (
    <section className={classes.audioTest}>
      <h2>
        {/* {Object.keys(words).length === 0 ? 'Starting...' : 'Audio Test'} */}
        Audio Test
      </h2>
      <hr style={{borderTop: '1px solid #b5bdb2', marginBottom: '1.3rem'}}/>

      {/* {(Object.keys(words).length === 0) && <Loading />} */}
      {/* {(Object.keys(words).length !== 0) && <Questions />} */}
      {!showScore && <Questions increaseScore={incrementScore} />}
      {showScore && <Scorecard score={score} />}

    </section>
  );
}

export default TestMode;