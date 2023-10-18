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
import Card from "../../ui/Card";
import ProgressBar from "../../ui/ProgressBar";
import classes from './Questions.module.css';
import api from '../../../util/axiosConfig';
import { useDispatch } from "react-redux";
import { testActions } from "../../../store/test";
import AuthContext from "../../../context/auth-context";
import LoadingBuffer from "../../ui/LoadingBuffer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db_firestore } from "../../../firebase";


const Questions = ({ words }) => {
  const [qno, setQno] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userAttempt, setUserAttempt] = useState({});

  const wordInputRef = useRef();
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [currWordAudio, setCurrWordAudio] = useState({audio_In:'',audio_Us:'',audio_Us_slow:'',audio_In_slow:'',def:''});
  
  const fetchAudio = async(i = 0) => {
    const q = query(collection(db_firestore, "words_audio_10000"), where("word", "==", words[i]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setCurrWordAudio({
        audio_In: doc.data().audio_IN,
        audio_Us: doc.data().audio_US,
        audio_In_slow: doc.data().audio_IN_slow,
        audio_Us_slow: doc.data().audio_US_slow,
        def: doc.data().def,
      });
    });
  }

  useEffect(() => {
    fetchAudio();
  }, [words]);

  const submitNextHandler = (event) => {
		event.preventDefault();

		const enteredWord = wordInputRef.current.value.trim().toLowerCase();
    const currWord = words[qno - 1];
    
    if (enteredWord === currWord) {
      dispatch(testActions.incrementScore());
    }

    setUserAttempt({...userAttempt, [currWord]: enteredWord});

    wordInputRef.current.value = "";

    if (progress < 100) {
      setProgress(progress + 10);
    }

    if(qno < 10) {
      setQno(qno + 1);
      fetchAudio(qno);
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
      dispatch(testActions.saveResponse(userAttempt));

    } catch(err) {
      console.log("not working!", err);
    }

    dispatch(testActions.toggleScore());
  }

  
  return (
    <>
      {(currWordAudio.audio_In === '') && <LoadingBuffer />}

      {(currWordAudio.audio_In !== '') && 
      <Card colour = {'#cdb4db'}>
        <Box sx={{padding: '0.5rem'}} component="form" onSubmit={submitNextHandler}>
          <Grid container sx={{ mb: 2}}>
            <Grid item xs={11}>
              <ProgressBar prog = {progress} />
            </Grid>

            <Grid item xs>
              <b>{qno}/10</b>
            </Grid>
          </Grid>

          <hr style={{borderTop: '1px solid #000000'}}/>
          <div className={classes.quo}>Listen carefully. Write the word or phrase you hear.</div>

          <Stack sx={{ mt: 2, mb: 2.4 }} direction="row" spacing={2}>
            <AccentButton country="US" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_Us} />
            <AccentButton country="IN" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_In} />
            <AccentButton country="US slow" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_Us_slow} />
            <AccentButton country="IN slow" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_In_slow} />
          </Stack>

          <Box sx={{ mb: 4 }}>
            <div className={classes.definition}>
              {currWordAudio.def}
            </div>
          </Box>

          <Grid container spacing={3}>
            <Grid item>
              <Box width='400px'>
                <TextField 
                  fullWidth 
                  autoFocus
                  placeholder='Your answer' 
                  id={'word_' + qno} 
                  size="small"
                  inputRef={wordInputRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "#422e28" },
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
                    spellCheck: 'false',
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
        </Box>
      </Card> }
    </>
  );
}

export default Questions;