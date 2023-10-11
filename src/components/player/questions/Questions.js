import { useEffect, useRef, useState, useContext } from "react";
import AccentButton from '../../ui/AccentButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProgressBar from "../../ui/ProgressBar";
import classes from './Questions.module.css';
import api from '../../../util/axiosConfig';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { testActions } from "../../../store/test";
import AuthContext from "../../../context/auth-context";
import LoadingBuffer from "../../ui/LoadingBuffer";


const Questions = ({ increaseScore }) => {
  const [qno, setQno] = useState(1);
  const [progress, setProgress] = useState(0);
  const [words, setWords] = useState([]);
  const [userAttempt, setUserAttempt] = useState({});
  const wordInputRef = useRef();
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();

  // const wordsMetadata = useSelector((state) => state.tabs.wordsFirebase);
  const wordLen = useSelector((state) => state.tabs.testWordLen);


  const fetchWords = async() => {
    try {
      const response = await api.post("/getRandomWords", {
        "userName":ctx.user.uid, 
        "minLength":wordLen, 
        "maxLength":wordLen
      });
      
      setWords(response.data);

    } catch(err) {
      console.log("not working!", err);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);


  const submitNextHandler = (event) => {
		event.preventDefault();

		const enteredWord = wordInputRef.current.value.trim().toLowerCase();
    const currWord = words[qno - 1];
    
    if (enteredWord === currWord) {
      increaseScore();
    }

    setUserAttempt({...userAttempt, [currWord]: enteredWord});

    wordInputRef.current.value = "";

    if (progress < 100) {
      setProgress(progress + 10);
    }

    if(qno < 10) {
      setQno(qno + 1);
    }
  }

  const [finishButton, setFinishButton] = useState("Finish");
  const showScoreCard = async() => {
    // console.log(userAttempt);
    setFinishButton("Please wait");
    try {
      await api.post("/save", {
        "userName": ctx.user.uid, 
        "attempt": userAttempt
      });
      
    } catch(err) {
      console.log("not working!", err);
    }

    dispatch(testActions.toggleScore());
  }

  
  return (
    <>
      {(words.length === 0) && <LoadingBuffer />}

      { (words.length !== 0) && 
      <Box component="form" onSubmit={submitNextHandler}>
        <Grid container sx={{ mb: 2}}>
          <Grid item xs={11}>
            <ProgressBar prog = {progress} />
          </Grid>

          <Grid item xs>
            <div>{qno}/10</div>
          </Grid>
        </Grid>

        <hr style={{borderTop: '1px solid #b5bdb2'}}/>
        <div className={classes.quo}>Listen carefully. Write the word or phrase you hear.</div>

        <Stack sx={{ mt: 2, mb: 4 }} direction="row" spacing={2}>
        {/* +wordsMetadata["aaron"].audio_IN */}
          <AccentButton country="US" sound={"data:audio/mpeg;base64,"} />
          <AccentButton country="UK" sound={"data:audio/mpeg;base64,"} />
        </Stack>

        <Grid container spacing={3}>
          <Grid item>
            <Box width='400px'>
              <TextField 
                fullWidth 
                placeholder='Your answer' 
                id={'word_' + qno} 
                size="small"
                inputRef={wordInputRef}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid #000000"             // focus
                    }
                  }
                }}
                InputProps={{ 
                  sx: { 
                    borderRadius: 16,
                    paddingLeft: 0.5,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <KeyboardIcon />
                    </InputAdornment>
                  ) 
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ mt: 0.2 }}>
              <Button 
                type="submit"
                variant='contained' 
                sx={{
                  background: '#c1292e', 
                  color: '#e5e5e5', 
                  "&:hover": {backgroundColor: "#c1292e" },
                  borderRadius: 16,
                  textTransform: 'none',
                  paddingLeft: 3,
                  paddingRight: 3
                }}
                disabled={progress === 100}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box>
              {progress !== 100 && 
              <Button 
                variant='contained' 
                sx={{
                  background: '#29335c', 
                  color: '#ffffff', 
                  "&:hover": {backgroundColor: "#29335c" },
                  borderRadius: 16,
                  textTransform: 'none',
                  paddingLeft: 3,
                  paddingRight: 3
                }}
                endIcon={<NavigateNextIcon />}
                onClick={submitNextHandler}
              >
                Next
              </Button> }

              {progress === 100 && 
              <Button 
                variant='contained' 
                sx={{
                  background: '#29335c', 
                  color: '#ffffff', 
                  "&:hover": {backgroundColor: "#29335c" },
                  borderRadius: 16,
                  textTransform: 'none',
                  paddingLeft: 3,
                  paddingRight: 3
                }}
                onClick={showScoreCard}
              >
                {finishButton}
              </Button> }
            </Box>
          </Grid>
        </Grid>
      </Box> }
    </>
  );
}

export default Questions;