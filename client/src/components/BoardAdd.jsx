import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

// import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
  },
  mainContainer:{
    margin:"auto",
    marginBottom:theme.spacing(3),
    padding:theme.spacing(10),
    backgroundColor:"white",
    minWidth:"580px",
    maxWidth:"1080px",
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

const BoardAdd = ({ board,fillInput, progress, onChangeHandler, boardAddClickHandler,open,togle}) => {
  const classes = useStyles();


  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={onChangeHandler.handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={onChangeHandler.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"글 등록"}</DialogTitle>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => boardAddClickHandler(e)}
        >
          <DialogContent>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item>
                <TextField
                  autoFocus
                  id="standard-basic"
                  label="title"
                  fullWidth
                  onChange={onChangeHandler.titleChangeHandler}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline-static"
                  label="content"
                  multiline
                  rows={6}
                  variant="outlined"
                  onChange={onChangeHandler.contentChangeHandler}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="cardContent"
                  onChange={onChangeHandler.cardContentChangeHandler}
                />
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e)=>{
                    return onChangeHandler.FileInputHandler(e);
                  }}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="default" startIcon={<CloudUploadIcon />} component="span" className={classes.button}>
                    사진 등록
                  </Button>
                </label> 
                {fillInput?
                  <p>{fillInput.name}</p>
                  :
                  <p>{"파일 선택 하지 않음"}</p>
                }
                {
                  togle?
                  <LinearProgressWithLabel value={progress} />
                  :""
                }
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onChangeHandler.handleClose} color="primary">
              {"취소"}
            </Button>
            <Button
              color="primary"
              onClick={(e) => {
                  return boardAddClickHandler(e);
                }
              }
            >
              {"저장"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default React.memo(BoardAdd);