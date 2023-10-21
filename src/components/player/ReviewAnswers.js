import { useEffect, useState } from "react";
import AccentButton from '../ui/AccentButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import classes from './ReviewAnswers.module.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db_firestore } from "../../firebase";
import { useSelector } from "react-redux";
import Card from "../ui/Card";
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import { useMediaQuery } from "@mui/material";


const ReviewAnswers = () => {
  const [qno, setQno] = useState(1);
  const [currWordAudio, setCurrWordAudio] = useState({audio_In:'',audio_Us:'',audio_Us_slow:'',audio_In_slow:''});

  const words = useSelector((state) => state.test.testWords);
  const score = useSelector((state) => state.test.score);
  const response = useSelector((state) => state.test.userResponse);
  const matches = useMediaQuery("(max-width:768px)");
  
  const fetchAudio = async(i = 0) => {
    const q = query(collection(db_firestore, "words_audio_10000"), where("word", "==", words[i]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setCurrWordAudio({
        audio_In: doc.data().audio_IN,
        audio_Us: doc.data().audio_US,
        audio_In_slow: doc.data().audio_IN_slow,
        audio_Us_slow: doc.data().audio_US_slow
      });
    });
  }

  useEffect(() => {
    fetchAudio();
  }, []);

  const nextHandler = () => {
    if(qno < 10) {
      setQno(qno + 1);
      fetchAudio(qno);
    }
  }

  const previousHandler = () => {
    if(qno > 1) {
      setQno(qno - 1);
      fetchAudio(qno - 2); 
    }
  }

  
  return (
    <Box>
      <div className={classes.reviewScore}>
        <span>Your final score: </span>
        <h1>{score} / 10</h1>
        <h3>Review your answers</h3>
      </div>

      <Card colour = {'white'}>
        <section className={classes.ques}>
          <div className={classes.quo}><b>{qno}.</b> Listen carefully. Write the word or phrase you hear.</div>

          <Stack sx={{ mt: 2, mb: 4 }} direction="row" spacing={2}>
            <AccentButton country="US" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_Us} />
            <AccentButton country="IN" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_In} />
            <AccentButton country="US slow" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_Us_slow} />
            <AccentButton country="IN slow" sound={"data:audio/mpeg;base64,"+currWordAudio.audio_In_slow} />
          </Stack>

          { response[words[qno - 1]] !== '' && response[words[qno - 1]] !== words[qno - 1] &&
          <Box>
            <div className={classes.wrongAnswer}>
              <Stack direction="row" alignItems="center" gap={1}>
                <ClearIcon sx={{ color: "#e84427" }} />
                <Typography variant="h6">{response[words[qno - 1]]}</Typography>
              </Stack>
            </div>
          </Box> }

          { response[words[qno - 1]] === '' &&
          <Box>
            <div className={classes.wrongAnswer}>
              <Stack direction="row" alignItems="center" gap={1}>
                <ClearIcon sx={{ color: "#e84427" }} />
                <Typography variant="h6">You didn't answer this question.</Typography>
              </Stack>
            </div>
          </Box> }

          <Box>
            <div className={classes.correctAnswer}>
              <Stack direction="row" alignItems="center" gap={1}>
                <CheckIcon sx={{ color: "#3fbf48" }} />
                <Typography variant="h6">{words[qno - 1]}</Typography>
              </Stack>
            </div>
          </Box>

          <div className={classes.output}>
            { response[words[qno - 1]] !== "" && response[words[qno - 1]] !== words[qno - 1] && 
            <Alert severity="error">Sorry, you didn't get this right.</Alert> }

            { response[words[qno - 1]] === words[qno - 1] &&
            <Alert severity="success">Well done, you got this right.</Alert> }
          </div>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Box>
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
                  startIcon={<NavigateBeforeIcon />}
                  onClick={previousHandler}
                  disabled={qno === 1}
                >
                  {matches ? 'Prev' : 'Previous'}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
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
                  onClick={nextHandler}
                  disabled={qno === 10}
                >
                  Next
                </Button>
              </Box>
            </Grid>

          </Grid>
        </section>
      </Card>

    </Box>
  );
}

export default ReviewAnswers;