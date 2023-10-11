import Card from "../ui/Card";
import Loading from "../ui/Loading";
import FoundWord from "./foundword/FoundWord";
import classes from './FoundWords.module.css';
import { useSelector } from 'react-redux';


const FoundWords = () => {

  const words = useSelector((state) => state.tabs.wordsFirebase);

  const wordList = words.slice(0, 10).map((w, i) => (
    <FoundWord
      id = {i}
      key = {i}
      name = {w.word}
      meaning = {w.defs[0]}
    />
  ));

  return (
    <section className={classes.wordsList}>
      {(words.length === 0) && <Loading />}

      {(words.length !== 0) && 
        <Card colour = {'white'}>
          <h1 className={classes.foundHeader}>Words Found</h1>
          <dl>{wordList}</dl>
        </Card>
      }
    </section>
  );
}

export default FoundWords;