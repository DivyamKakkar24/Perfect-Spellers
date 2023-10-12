import { useContext, useEffect, useState } from 'react';
import classes from './TestMode.module.css';
import Questions from './questions/Questions';
import { useDispatch, useSelector } from 'react-redux';
import { testActions } from '../../store/test';
import Scorecard from './Scorecard';
import AuthContext from '../../context/auth-context';
import api from '../../util/axiosConfig';


const TestMode = () => {
  const showScore = useSelector((state) => state.test.showScore);
  const [score, setScore] = useState(0);
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();

  const wordLen = useSelector((state) => state.tabs.testWordLen);

  const fetchWords = async() => {
    try {
      const response = await api.post("/getRandomWords", {
        "userName":ctx.user.uid, 
        "minLength":wordLen, 
        "maxLength":wordLen
      });
      
      dispatch(testActions.fetchTestWords(response.data));

    } catch(err) {
      console.log("not working!", err);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const incrementScore = () => {
    setScore(score + 1);
  }

  return (
    <section className={classes.audioTest}>
      <h2>
        Audio Test
      </h2>
      <hr style={{borderTop: '1px solid #b5bdb2', marginBottom: '1.3rem'}}/>

      {!showScore && <Questions increaseScore={incrementScore} />}
      {showScore && <Scorecard score={score} />}

    </section>
  );
}

export default TestMode;