import { collection, getDocs } from "firebase/firestore";
import {db_firestore, storage} from '../../firebase';
import { useEffect, useState } from 'react';
import Style from './SpellWords.css';
import Card from "../ui/Card";
import WordItem from "./worditem/WordItem";
import { getDownloadURL, ref } from "firebase/storage";



const SpellWords = () => {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    await getDocs(collection(db_firestore, "test_storage_trip"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        setWords(newData);

      })
  }

  const listAllFiles = async() => {
    console.log("ABC!");

    const fileRefs = [
      ref(storage, 'files/ab1.mp3'),
      ref(storage, 'files/ab2.mp3'),
      ref(storage, 'files/ab3.mp3'),
      ref(storage, 'files/ab4.mp3'),
      ref(storage, 'files/ab5.mp3'),
      ref(storage, 'files/ab6.mp3'),
      ref(storage, 'files/ab7.mp3'),
      ref(storage, 'files/ab8.mp3'),
      ref(storage, 'files/ab9.mp3'),
      ref(storage, 'files/ab10.mp3'),
      ref(storage, 'files/ab11.mp3'),
      ref(storage, 'files/ab12.mp3'),
      ref(storage, 'files/ab13.mp3'),
      ref(storage, 'files/ab14.mp3'),
      ref(storage, 'files/ab15.mp3'),
      ref(storage, 'files/ab16.mp3'),
      ref(storage, 'files/ab17.mp3'),
      ref(storage, 'files/ab18.mp3'),
      ref(storage, 'files/ab19.mp3'),
      ref(storage, 'files/ab20.mp3')
    ]; // Replace with your file references
    
    const downloadPromises = fileRefs.map((fileRef) => getDownloadURL(fileRef));
    
    Promise.all(downloadPromises)
      .then((urls) => {
        console.log('Download URLs:', urls);
        setWords(urls);
      })
      .catch((error) => {
        console.error('Error getting download URLs:', error);
      });

  }

  useEffect(() => {
    // fetchWords();
    listAllFiles();
    // console.log(words);
  }, []);


  const wordList = words.map((w, i) => (
    <WordItem
      id = {i}
      key = {i}
      name = {"Word " + (i + 1)}
      sound = {w}
    />

    // <li>
    //   {i}
    //   <audio src={w} controls />
    // </li>
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