import AccentButton from '../../ui/AccentButton';
import classes from './WordItem.module.css';
import Stack from '@mui/material/Stack';
import WordItemForm from './WordItemForm';


const WordItem = (props) => {

  return (
    <li className={classes.word}>
      <h3>{props.name}</h3>
      <Stack className={classes.accents} direction="row" spacing={2}>
        <AccentButton country = "US" sound = {"data:audio/mpeg;base64," + props.usaccent} />
        <AccentButton country = "UK" sound = {"data:audio/mpeg;base64," + props.ukaccent} />
      </Stack>
      <WordItemForm id = {props.id} />
    </li>
  );
}

export default WordItem;