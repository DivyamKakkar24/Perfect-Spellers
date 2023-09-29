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
    await getDocs(collection(db_firestore, "test_sound"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        setWords(newData);

      })
    
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const wordList = words.map((w, i) => (
    <WordItem
      id = {w.id}
      key = {w.id}
      name = {`Word ${i + 1}`}
      sound = {w.encoded_base64}
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