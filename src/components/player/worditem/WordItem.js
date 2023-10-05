import { useState } from 'react';
import AccentButton from '../../ui/AccentButton';
import classes from './WordItem.module.css';
import Stack from '@mui/material/Stack';
import WordItemForm from './WordItemForm';


const WordItem = (props) => {
  const [chance, setChance]= useState(true);

  const showAnswerHandler = () => {
    setChance(false);
  }


  return (
    <li className={classes.word}>
      <h3>{chance ? props.name : props.correctAns}</h3>
      <Stack className={classes.accents} direction="row" spacing={2}>
        <AccentButton country = "US" sound = {"data:audio/mpeg;base64," + props.usaccent} />
        <AccentButton country = "UK" sound = {"data:audio/mpeg;base64," + props.ukaccent} />
      </Stack>

      <WordItemForm 
        id = {props.id} 
        correctAns = {props.correctAns} 
        chanceLeft = {chance}
        showAns = {showAnswerHandler} 
      />
    </li>
  );
}

export default WordItem;