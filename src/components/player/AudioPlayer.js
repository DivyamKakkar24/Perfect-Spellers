import React from 'react';
import {useState} from 'react';
import song1 from '../../music/music1.ogg';
import song2 from '../../music/music2.mp3';
import song3 from '../../music/music3.mp3';
import song4 from '../../music/music4.mp3';
import song5 from '../../music/music5.mp3';
import song6 from '../../music/music6.ogg';

import Style from './AudioPlayer.css';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const AudioPlayer = () => {
	const [song, setSong] = useState('');

	const handleChange = (event) => {
	    setSong(event.target.value);
	};

	return (
	  <div className = "audio-player">
	  	<h1>Audio Player</h1>

	  	<Box sx={{ minWidth: 120, padding: 2 }}>
	      <FormControl>
	        <Select
	          labelId="demo-simple-select-label"
	          id="demo-simple-select"
	          value={song}
	          sx={{ color: 'black', background: '#F1f5f8' }}
	          onChange={handleChange}
	        >
	          <MenuItem value={song1}>File 1</MenuItem>
	          <MenuItem value={song2}>File 2</MenuItem>
	          <MenuItem value={song3}>File 3</MenuItem>
	          <MenuItem value={song4}>File 4</MenuItem>
	          <MenuItem value={song5}>File 5</MenuItem>
	          <MenuItem value={song6}>File 6</MenuItem>
	        </Select>
	      </FormControl>
	    </Box>

	  	<audio src = {song} controls />
	  </div>
	)
};

export default AudioPlayer;