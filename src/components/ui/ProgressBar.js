import classes from './ProgressBar.module.css';


const ProgressBar = (props) => {

  return (
    <div className={classes.contain}>
      <div className={classes.progressBar}>
        <div className={classes.progressBarFill} style={{ width: `${props.prog}%`}}>
          {" "}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;