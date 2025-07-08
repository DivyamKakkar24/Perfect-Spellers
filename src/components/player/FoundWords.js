import { collection, getDocs } from "firebase/firestore";
import {db_firestore} from '../../firebase';
import { useEffect, useState } from 'react';
import Style from './SpellWords.css';
import Loading from "../ui/Loading";
import { useSelector } from "react-redux";


const FoundWords = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const wordLen = useSelector((state) => state.tabs.foundWordsLen);
  const advancedFilter = useSelector((state) => state.tabs.advancedFilter);

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

  const applyAdvancedFilter = (word, filter) => {
    if (!filter.value) return true; // No filter value, show all words
    
    const wordLower = word.toLowerCase();
    const filterValue = filter.value.toLowerCase();
    
    switch (filter.type) {
      case "Starting With":
        return wordLower.startsWith(filterValue);
      case "Ending With":
        return wordLower.endsWith(filterValue);
      case "Containing Exactly":
        return wordLower.includes(filterValue);
      case "Containing Letters":
        // Check if word contains all letters from filterValue
        return filterValue.split('').every(letter => wordLower.includes(letter));
      default:
        return true;
    }
  };

  const wordList = words.map((w, i) => {
    // Apply word length filter
    if (wordLen !== 0 && w.word.length !== wordLen) {
      return null;
    }
    
    // Apply advanced filter
    if (!applyAdvancedFilter(w.word, advancedFilter)) {
      return null;
    }
    
    return <li className="table-row" key={i}>{w.word}</li>;
  });

  return (
    <section className="foundWords">
      {isLoading && <Loading />}

      {!isLoading && (<div className = "container">
          <ol className = "responsive-table">
            {wordList}
          </ol>
      </div>)}
    </section>
  );

}

export default FoundWords;