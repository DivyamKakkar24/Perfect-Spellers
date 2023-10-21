import { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Style from './Tabs.css';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';
import { useMediaQuery } from '@mui/material';


const AudioTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useRouteLoaderData('root');
	const ctx = useContext(AuthContext);

  const [wordLen, setWordLen] = useState(4);

  const matches = useMediaQuery("(max-width:600px)");
  
  const diffOptions = [
    {label: "Easy", key: 1, value: "Easy"},
    {label: "Medium", key: 2, value: "Medium"},
    {label: "Hard", key: 3, value: "Hard"},
    {label: "Competitive", key: 4, value: "Competitive"}
  ];

  const lenOptions = [
    {label: "4-Letter Words", key: 1, value: 4},
    {label: "5-Letter Words", key: 2, value: 5},
    {label: "6-Letter Words", key: 3, value: 6},
    {label: "7-Letter Words", key: 4, value: 7},
    {label: "8-Letter Words", key: 5, value: 8},
    {label: "9-Letter Words", key: 6, value: 9}
  ];

  const startTestHandler = () => {
    if(!ctx.user || !token || token !== ctx.user.accessToken) {
      navigate('/auth?mode=login');
      return;
    }

    // console.log(token);
    dispatch(tabsActions.toggleTestMode(wordLen));
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={2} sm={4} md={4}>
        <Box width={`${matches ? `120px` : `170px`}`}>
          <InputLabel id="ip-label">Word Length: </InputLabel>
          <Select
            labelId="wordlength-labl"
            id="length"
            defaultValue={4}
            onChange={(e) => setWordLen(e.target.value)}
            fullWidth
            sx={{
              mt: 1,
              height: 31,
              background: '#ffffff',
              "& fieldset": { border: 'none' }
            }}
          >
            {lenOptions.map((op) => (
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

      <Grid item xs={2} sm={4} md={6}>
        <Box width={`${matches ? `110px` : `150px`}`}>
          <InputLabel id="ip-label">Difficulty: </InputLabel>
          <Select
            labelId="difficulty-labl"
            id="difficulty"
            defaultValue="Medium"
            onChange={() => console.log("")}
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
        <Box sx={{ mt: 3.2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              background: '#48cae4', 
              "&:hover": {backgroundColor: "#48cae4" },
              color: '#000000'  
            }}
            onClick={startTestHandler}
          >
            Start
          </Button>
        </Box>
      </Grid>

    </Grid>
  );
}


export default AudioTest;