import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  }
}));

const BoardAdd = ({ board, onChangeHandler, onClickHandler,cardContentChangeHandler }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
      <Card className={classes.mainContainer}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"글 등록"}</DialogTitle>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => onClickHandler(e)}
          >
            <DialogContent>
            
          <Grid container spacing={2} alignItems="center" justify="center" direction="column">

            <Grid item>
              <TextField
                id="standard-basic"
                label="title"
                onChange={onChangeHandler.titleChangeHandler}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-basic"
                label="content"
                onChange={onChangeHandler.contentChangeHandler}
              />
            <Grid item>
            </Grid>
              <TextField
                id="standard-basic"
                label="image"
                onChange={onChangeHandler.imageChangeHandler}
              />
            <Grid item>
            </Grid>
              <TextField
                id="standard-basic"
                label="cardContent"
                onChange={onChangeHandler.cardContentChangeHandler}
              />
            </Grid>

          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {"취소"}
            </Button>
            <Button
              color="primary"
              onClick={(e) => {
                  setOpen(false);
                  return onClickHandler(e);
                }
              }
            >
              {"저장"}
            </Button>
          </DialogActions>
          </form>
        </Dialog>

      </Card>
  );
};

export default React.memo(BoardAdd);