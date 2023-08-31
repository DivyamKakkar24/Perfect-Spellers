import { collection, getDocs } from "firebase/firestore";
import {db_firestore} from '../../firebase';
import { useEffect, useState } from 'react';
import Style from './SpellWords.css';
import Card from "../ui/Card";
import WordItem from "./worditem/WordItem";


const SpellWords = () => {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    await getDocs(collection(db_firestore, "test_sound"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        setWords(newData);

        // console.log(newData);
      })
  }

  useEffect(() => {
    fetchWords();
    console.log(words);
  }, []);

  const wordList = words.map(w => (
    <WordItem
      id = {w.id}
      key = {w.id}
      name = {w.name}
      sound = {w.encoded_base64}
    />
  ));

  return (
    <section className="wordsList">
      <Card>
        <ul>{wordList}</ul>
      </Card>
    </section>
  )

}

export default SpellWords;