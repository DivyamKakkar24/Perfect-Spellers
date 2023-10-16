import Card from '../ui/Card';
import classes from './Scorecard.module.css';
import trophy from '../../assets/trophy.png';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { testActions } from '../../store/test';


const Scorecard = () => {
  const score = useSelector((state) => state.test.score);
  const dispatch = useDispatch();

  const retryHandler = () => {
    dispatch(testActions.anotherAttempt());
  }

  const showReview = () => {
    dispatch(testActions.reviewAnswers());
  }
  
  return (
    <section className={classes.resultCard}>
      <Card colour={'white'}>
        <div className={classes.trophy}>
          <img 
            src={trophy} 
            border="0" 
            alt="Trophy" 
            width={180}
          />

          <h1>You’ve finished the test!</h1>
          <span>Review your answers and try again.</span>
          <br/><br/>

          <h4>Your Score is</h4>
          <h2>{score} / 10</h2>
          
          <Stack 
            sx={{ mt: 3, mb: 2 }} 
            direction="row" 
            spacing={27}
            display="flex" justifyContent="center" alignItems="center"
          >
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
              endIcon={<NavigateNextIcon style={{ color:"#ffffff" }} />}
              onClick={showReview}
            >
              See your answers
            </Button>

            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
              }}
              onClick={retryHandler}
            >
              Try again
            </Button>
          </Stack>

        </div>
      </Card>
    </section>
  );
}

export default Scorecard;
