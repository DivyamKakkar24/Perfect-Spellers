import Style from './WordItem.css';
import WordItemForm from './WordItemForm';


const WordItem = (props) => {

  return (
    <li className="word">
      <h3>{props.name}</h3>
      <audio src = {"data:audio/mpeg;base64," + props.sound} controls />
      <WordItemForm id = {props.id} />
    </li>
  );
}

export default WordItem;