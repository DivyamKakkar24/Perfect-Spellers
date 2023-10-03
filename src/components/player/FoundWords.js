import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Loading from "../ui/Loading";
import { db_firestore } from "../../firebase";
import FoundWord from "./foundword/FoundWord";
import classes from './FoundWords.module.css';


const FoundWords = () => {
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
    <FoundWord
      id = {i}
      key = {i}
      name = {w.word}
      meaning = {w.defs[0]}
    />
  ));

  return (
    <section className={classes.wordsList}>
      {isLoading && <Loading />}

      {!isLoading && 
        <Card colour = {'white'}>
          <h1 className={classes.foundHeader}>Words Found</h1>
          <dl>{wordList}</dl>
        </Card>
      }
    </section>
  );
}

export default FoundWords;