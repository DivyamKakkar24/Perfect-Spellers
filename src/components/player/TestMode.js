import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import classes from './TestMode.module.css';
import Questions from './questions/Questions';
import { useDispatch, useSelector } from 'react-redux';
import { testActions } from '../../store/test';
import { tabsActions } from '../../store/tabs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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
  const [len, setLen] = useState(4);
  const wordLen = useSelector((state) => state.tabs.testWordLen);

  const lenOptions = [
    {label: "4-Letter Words", key: 1, value: 4},
    {label: "5-Letter Words", key: 2, value: 5},
    {label: "6-Letter Words", key: 3, value: 6},
    {label: "7-Letter Words", key: 4, value: 7},
    {label: "8-Letter Words", key: 5, value: 8},
    {label: "9-Letter Words", key: 6, value: 9},
    {label: "10-Letter Words", key: 7, value: 10},
    {label: "11-Letter Words", key: 8, value: 11},
    {label: "12-Letter Words", key: 9, value: 12},
    {label: "13-Letter Words", key: 10, value: 13},
    {label: "14-Letter Words", key: 11, value: 14},
    {label: "15-Letter Words", key: 12, value: 15}
  ];

  const fetchWords = async() => {
    try {
      const response = await api.post("/getRandomWords", {
        "userName":ctx.user.uid, 
        "minLength":wordLen, 
        "maxLength":wordLen
      });
      
      setWords(response.data);
      dispatch(testActions.fetchTestWords(response.data));
      
    } catch(err) {
      console.log("not working!", err);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);


  const startNewTestHandler = async() => {
    dispatch(tabsActions.toggleTestMode(len));

    try {
      const response = await api.post("/getRandomWords", {
        "userName":ctx.user.uid, 
        "minLength":len, 
        "maxLength":len
      });
      
      setWords(response.data);
      dispatch(testActions.fetchTestWords(response.data));
      
    } catch(err) {
      console.log("not working!", err);
    }

    // dispatch(testActions.anotherAttempt());
  }


  return (
    <section className={classes.audioTest}>
      <Grid container>
        <Grid item xs>
          <h2>Audio Test</h2>
        </Grid>
        
        { !showQues && 
        <Stack direction="row" spacing={3}>
          <Box width='170px'>
            <Select
              labelId="wordlength-labl"
              id="length"
              defaultValue={wordLen}
              onChange={(e) => setLen(e.target.value)}
              fullWidth
              sx={{
                mt: 1.8,
                height: 31,
                background: '#ffffff',
              }}
            >
              {lenOptions.map((op) => (
                <MenuItem
                  key={op.key}
                  value={op.value}
                >
                  {op.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Button 
              variant="contained" 
              sx={{ 
                mt: 1,
                background: '#ffd60a', 
                "&:hover": {backgroundColor: "#ffd60a" },
                color: '#161925',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: 16  
              }}
              onClick={startNewTestHandler}
            >
              Start New List
            </Button>
          </Box>
        </Stack> }
      </Grid>

      <hr style={{borderTop: '1px solid #b5bdb2', marginBottom: '1.3rem'}}/>

      {(words.length === 0) && <LoadingBuffer />}
      {showQues && (words.length !== 0) && <Questions words={words} />}
      {showScore && <Scorecard />}
      {review && <ReviewAnswers />}

    </section>
  );
}

export default TestMode;