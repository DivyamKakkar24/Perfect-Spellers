import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Style from './Tabs.css';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';
import { useState } from 'react';


const FindWords = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");

  const [wordLen, setWordLen] = useState(0);

  const diffOptions = [
    {label: "Random", key: 0, value: 0},
    {label: "4-Letter Words", key: 1, value: 4},
    {label: "5-Letter Words", key: 2, value: 5},
    {label: "6-Letter Words", key: 3, value: 6},
    {label: "7-Letter Words", key: 4, value: 7},
    {label: "8-Letter Words", key: 5, value: 8}
  ];

  const specifyOptions = [
    {label: "Starting With", key: 1, value: "Starting With"},
    {label: "Ending With", key: 2, value: "Ending With"},
    {label: "Containing Exactly", key: 3, value: "Containing Exactly"},
    {label: "Containing Letters", key: 4, value: "Containing Letters"}
  ];

  const findWordsHandler = () => {
    dispatch(tabsActions.toggleFoundWords(wordLen));
  }

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs>
        <Box width={`${matches ? `120px` : `170px`}`}>
          <InputLabel id="ip-label">Word Length: </InputLabel>
          <Select
            labelId="wordlength-labl"
            id="length"
            defaultValue={0}
            onChange={(e) => setWordLen(e.target.value)}
            fullWidth
            sx={{
              mt: 1,
              height: 31,
              background: '#ffffff',
              "& fieldset": { border: 'none' }
            }}
          >
            {diffOptions.map((op) => (
              <MenuItem
                key={op.key}
                value={op.value}
              >
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>

      <Grid item xs>
        <Box width={`${matches ? `120px` : `194px`}`}>
          <InputLabel id="ip-label">Advanced Filter: </InputLabel>
          <Select
            labelId="specify-labl"
            id="specify"
            defaultValue="Starting With"
            onChange={() => console.log("")}
            fullWidth
            sx={{
              mt: 1,
              height: 31,
              background: '#ffffff',
              "& fieldset": { border: 'none' }
            }}
          >
            {specifyOptions.map((op) => (
              <MenuItem
                key={op.key}
                value={op.value}
              >
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>
      
      <Grid item xs>
        <Box sx={{ mt: 1.7 }}>
          <TextField 
            placeholder="Ex: eve" 
            id="specify-op" 
            variant="filled" 
            size="small"
            color="success"
            sx={{ 
              input: { color: 'white' }, 
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={10.4} />

      <Grid item xs>
        <Box>
          <Button 
            variant="contained" 
            sx={{ 
              background: '#ff5c6c', 
              "&:hover": {backgroundColor: "#ff5c6c" },
              color: '#ffffff' 
            }}
            onClick={findWordsHandler}
          >
            Find
          </Button>
        </Box>
      </Grid>

    </Grid>
  );
}


export default FindWords;