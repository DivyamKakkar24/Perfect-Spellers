import React from 'react';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useMediaQuery } from '@mui/material';


const AccentButton = (props) => {
  const audio = new Audio(props.sound);

  const matches = useMediaQuery("(max-width:768px)");

  const playAudio = () => {
    audio.play();
  }

  return (
    <>
      { !matches && 
      <Button 
        variant="contained" 
        startIcon={<VolumeUpIcon sx={{ width: 30, height: 30 }} />} 
        onClick={playAudio}
        sx={{
          background: '#f8f7ff', 
          color: '#192a51',
          "&:hover": {backgroundColor: "#f8f7ff" },
          width: 170,
          height: 75,
          fontSize: '23px'
        }}
      >
        {props.country}
      </Button> }
      
      { matches && 
      <Button 
        variant="contained" 
        startIcon={<VolumeUpIcon sx={{ width: 22, height: 22 }} />} 
        onClick={playAudio}
        sx={{
          background: '#f8f7ff', 
          color: '#192a51',
          "&:hover": {backgroundColor: "#f8f7ff" },
          width: 100,
          height: 35,
          fontSize: '12px'
        }}
      >
        {props.country}
      </Button> }

    </>
  );
}

export default AccentButton;