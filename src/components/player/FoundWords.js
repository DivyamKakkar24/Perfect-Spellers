import { collection, getDocs } from "firebase/firestore";
import {db_firestore} from '../../firebase';
import { useEffect, useState } from 'react';
import Style from './SpellWords.css';
import Card from "../ui/Card";
import Loading from "../ui/Loading";
import { useSelector } from "react-redux";


const FoundWords = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const wordLen = useSelector((state) => state.tabs.foundWordsLen);

  const fetchWords = async () => {
    await getDocs(collection(db_firestore, "words_audio_300"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        setWords(newData);

      })
    
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const wordList = words.map((w, i) => {
    if (wordLen === 0) 
      return <li>{w.word}</li>;
      
    if (w.word.length === wordLen) {
      return <li>{w.word}</li>;
    }
    return null;
  });

  return (
    <section className="foundWords">
      {isLoading && <Loading />}

      {!isLoading &&
        <Card colour = {'#F5F5CC'}>
          <ol>{wordList}</ol>
        </Card>
      }
    </section>
  );

}

export default FoundWords;