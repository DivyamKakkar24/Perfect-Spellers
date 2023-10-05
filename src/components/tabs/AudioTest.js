import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import Style from './Tabs.css';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { useDispatch } from 'react-redux';
import { tabsActions } from '../../store/tabs';


const AudioTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useRouteLoaderData('root');
	const ctx = useContext(AuthContext);
  
  const diffOptions = [
    {label: "Easy", key: 1, value: "Easy"},
    {label: "Medium", key: 2, value: "Medium"},
    {label: "Hard", key: 3, value: "Hard"},
    {label: "Competitive", key: 4, value: "Competitive"}
  ];

  const startTestHandler = () => {
    if(!ctx.user || !token || token !== ctx.user.accessToken) {
      navigate('/auth?mode=login');
      return;
    }

    // console.log(token);
    dispatch(tabsActions.toggleTestMode());
  }

  const pin = pink[800];
  const pin2 = pink[600];

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Box width='150px'>
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

      <Grid item xs={6}>
        <FormControl>
          <FormLabel id="ip-label">Duration: </FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="duration-radio-buttons-minutes"
            defaultValue="3"
          >
            <FormControlLabel value="3" control={<Radio sx={{ color: pin, '&.Mui-checked': { color: pin2 } }} />} label="3 mins" />
            <FormControlLabel value="5" control={<Radio sx={{ color: pin, '&.Mui-checked': { color: pin2 } }} />} label="5 mins" />
            <FormControlLabel value="7" control={<Radio sx={{ color: pin, '&.Mui-checked': { color: pin2 } }} />} label="7 mins" />

          </RadioGroup>
        </FormControl>
      </Grid>
      
      <Grid item xs>
        <Box sx={{ mt: 3 }}>
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