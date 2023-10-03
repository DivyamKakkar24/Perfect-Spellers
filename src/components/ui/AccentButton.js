import React from 'react';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


const AccentButton = (props) => {
  const audio = new Audio(props.sound);

  const playAudio = () => {
    audio.play();
  }

  return (
    <Button 
      variant="contained" 
      startIcon={<VolumeUpIcon />} 
      onClick={playAudio}
      sx={{
        background: '#f8f7ff', 
        color: '#192a51',
        "&:hover": {backgroundColor: "#f8f7ff" },
      }}
    >
      {props.country}
    </Button>
  );
}

export default AccentButton;