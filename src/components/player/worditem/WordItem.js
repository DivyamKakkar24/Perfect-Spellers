import Style from './WordItem.css';
import WordItemForm from './WordItemForm';


const WordItem = (props) => {
  // "data:audio/mpeg;base64," + 

  return (
    <li className="word">
      <h3>{props.name}</h3>
      <audio src = {props.sound} controls />
      <WordItemForm id = {props.id} />
    </li>
  );
}

export default WordItem;