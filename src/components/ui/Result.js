import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';


const Result = (props) => {
  const {removeResult} = props;

  useEffect(() => {
    const time = setTimeout(() => {
      removeResult();
    }, 3000);

    return () => clearTimeout(time);
  }, [removeResult]);


  return (

    <Alert sx={{ mt: 2 }} severity={props.type}>{props.message}</Alert>
  );
}

export default Result;