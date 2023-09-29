import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Style from './Tabs.css';


const Practise = () => {
  
  const diffOptions = [
    {label: "Easy", key: 1, value: "Easy"},
    {label: "Medium", key: 2, value: "Medium"},
    {label: "Hard", key: 3, value: "Hard"},
    {label: "Competitive", key: 4, value: "Competitive"}
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={10}>
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
      
      <Grid item xs>
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            sx={{ 
              background: '#ff5c6c', 
              "&:hover": {backgroundColor: "#ff5c6c" },
              color: '#ffffff'  
            }}
          >
            Find
          </Button>
        </Box>
      </Grid>

    </Grid>
  );
}


export default Practise;