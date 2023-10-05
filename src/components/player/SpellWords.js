import { collection, getDocs } from "firebase/firestore";
import {db_firestore} from '../../firebase';
import { useEffect, useState } from 'react';
import Style from './SpellWords.css';
import Card from "../ui/Card";
import WordItem from "./worditem/WordItem";
import Loading from "../ui/Loading";


const SpellWords = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWords = async () => {
    await getDocs(collection(db_firestore, "words_metadata_100"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        setWords(newData);

      })
    
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const wordList = words.slice(0, 10).map((w, i) => (
    <WordItem
      id = {i}
      key = {i}
      name = {`Word ${i + 1}`}
      correctAns = {w.word}
      usaccent = {w.audio_US}
      ukaccent = {w.audio_IN}
    />
  ));

  return (
    <section className="wordsList">
      {isLoading && <Loading />}

      {!isLoading &&
        <Card colour = {'white'}>
          <ul>{wordList}</ul>
        </Card>
      }
    </section>
  );

}

export default SpellWords;