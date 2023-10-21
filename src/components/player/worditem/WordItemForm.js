import { useState, useRef } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db_firestore } from '../../../firebase';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Result from '../../ui/Result';
import ResultSymbol from '../../ui/ResultSymbol';
import { useMediaQuery } from '@mui/material';


const WordItemForm = (props) => {
	const wordInputRef = useRef();

  const [result, setResult] = useState({show: false, message: '', type: ''});
  const [output, setOutput] = useState({showOp: false, op: false});
  const matches = useMediaQuery("(max-width:768px)");


  const showResult = (show = false, type = '', message = '') => {
    setResult({
      show,
      type,
      message
    });
  }

  const submitHandler = (event) => {
		event.preventDefault();
		const enteredWord = wordInputRef.current.value;

		if (enteredWord.trim().length === 0) {
			showResult(true, 'error', 'Please enter your answer!');
			return;
		}
    
    if (enteredWord.trim().toLowerCase() === props.correctAns) {
      showResult(true, 'success', 'Correct Answer!');
      setOutput({showOp: true, op: true});
			return;
    }

    if (enteredWord.trim().toLowerCase() !== props.correctAns) {
      showResult(true, 'error', 'Wrong Answer!');
      setOutput({showOp: true, op: false});
			return;
    }

    // try {
    //   const docRef = await addDoc(collection(db_firestore, "user_attempts"), {
    //     answer_for: props.id,
    //     spelling_entered: enteredWord,
    //     is_it_correct: false
    //   });
    //   console.log(enteredWord);
    //   console.log("Document written with ID: ", docRef.id);
    //   setWordIsValid(true);
    // } catch (e) {
    //   console.log("Error adding document: ", e);
    // }
	}

  
  return (
    <Box component="form" onSubmit={submitHandler} width={`${matches ? `250px` : `300px`}`}>
      <TextField 
        fullWidth 
        placeholder='Enter the Word' 
        id={'word_' + props.id} 
        color="secondary"
        size="small"
        inputRef={wordInputRef}
        InputProps={{
          spellCheck: 'false',
          endAdornment: (
            <ResultSymbol correct={output} />
          )
        }}
      />

      <Stack sx={{ mt: 1 }} spacing={2} direction="row">
        <Button 
          type="submit"
          variant='contained' 
          sx={{
            background: '#008000', 
            color: '#ffffff', 
            "&:hover": {backgroundColor: "#008000" },
            borderRadius: 2,
            textTransform: 'none',
          }}
          disabled={!props.chanceLeft}
        >
          Check Answer
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
          }}
          onClick={props.showAns}
        >
          Show Word
        </Button>
      </Stack>

      {result.show && <Result {...result} removeResult = {showResult} />}
    </Box>
  );
}

export default WordItemForm;
