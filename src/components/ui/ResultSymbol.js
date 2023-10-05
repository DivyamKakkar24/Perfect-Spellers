import InputAdornment from '@mui/material/InputAdornment';
import AbcIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


const ResultSymbol = (props) => {
  const blank = props.correct.showOp;

  if (!blank) {
    return (
      <InputAdornment position="end">
        <AbcIcon fontSize='large' />
      </InputAdornment>
    );
  }

  return (
    <InputAdornment position="end">
      { props.correct.op ? <CheckIcon sx={{ color: "#3fbf48" }} /> : <ClearIcon sx={{ color: "#e84427" }}/> }
    </InputAdornment>
  );
}

export default ResultSymbol;