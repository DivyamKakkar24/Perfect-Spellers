import React from 'react';
import classes from './Loading.module.css';
import loading from '../../assets/loading_words.gif';

const Loading = () => {
	return (
		<div className={classes.loading}>
      <img 
        src={loading} 
        border="0" 
        alt="Loading" 
      />
    </div>
	);
}

export default Loading;
