import Style from './WordItemForm.css';
import { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db_firestore } from '../../../firebase';

const WordItemForm = (props) => {
  const [wordIsValid, setWordIsValid] = useState(true);
	const wordInputRef = useRef();

  const submitHandler = async(event) => {
		event.preventDefault();
		const enteredWord = wordInputRef.current.value;

		if (enteredWord.trim().length === 0) {
			setWordIsValid(false);
			return;
		}

    try {
      const docRef = await addDoc(collection(db_firestore, "user_attempts"), {
        answer_for: props.id,
        spelling_entered: enteredWord,
        is_it_correct: false
      });
      console.log(enteredWord);
      console.log("Document written with ID: ", docRef.id);
      setWordIsValid(true);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
	};

  return (
    <form onSubmit={submitHandler} className='inputForm'>
      <input ref={wordInputRef} id={'word_' + props.id} type='text' placeholder='Enter the Word'/>
      <button>Check Answer</button>
      {!wordIsValid && <p style={{color: 'red'}}>Please enter your answer.</p>}
    </form>
  );
}

export default WordItemForm;
