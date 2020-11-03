import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
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
  return (
      <Card className={classes.mainContainer}>
        <Grid container spacing={3} alignItems="center" justify="center" direction="column">
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => onClickHandler(e)}
          >
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
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => onClickHandler(e)}
            >
              {"저장"}
            </Button>
          </form>
          </Grid>
      </Card>
  );
};

export default React.memo(BoardAdd);