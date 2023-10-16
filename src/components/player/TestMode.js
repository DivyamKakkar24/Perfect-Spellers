import { useContext, useEffect, useState } from 'react';
import classes from './TestMode.module.css';
import Questions from './questions/Questions';
import { useDispatch, useSelector } from 'react-redux';
import { testActions } from '../../store/test';
import Scorecard from './Scorecard';
import AuthContext from '../../context/auth-context';
import api from '../../util/axiosConfig';
import LoadingBuffer from '../ui/LoadingBuffer';
import ReviewAnswers from './ReviewAnswers';


const TestMode = () => {
  const showQues = useSelector((state) => state.test.showQuestions);
  const showScore = useSelector((state) => state.test.showScore);
  const review = useSelector((state) => state.test.review);

  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [words, setWords] = useState([]);
  const wordLen = useSelector((state) => state.tabs.testWordLen);

  const fetchWords = async() => {
    try {
      const response = await api.post("/getRandomWords", {
        "userName":ctx.user.uid, 
        "minLength":wordLen, 
        "maxLength":wordLen
      });
      
      dispatch(testActions.fetchTestWords(response.data));
      setWords(response.data);
      
    } catch(err) {
      console.log("not working!", err);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);


  return (
    <section className={classes.audioTest}>
      <h2>
        Audio Test
      </h2>
      <hr style={{borderTop: '1px solid #b5bdb2', marginBottom: '1.3rem'}}/>

      {(words.length === 0) && <LoadingBuffer />}
      {showQues && (words.length !== 0) && <Questions words={words} />}
      {showScore && <Scorecard />}
      {review && <ReviewAnswers />}

    </section>
  );
}

export default TestMode;