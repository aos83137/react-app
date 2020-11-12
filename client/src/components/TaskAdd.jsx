import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const TaskAdd = ({ task, onChangeHandler, onClickHandler, modify }) => {
  const classes = useStyles();

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onClickHandler(e)}
      >
        <TextField
          id="standard-basic"
          label="Inset Todo"
          value={task}
          onChange={onChangeHandler}
        />
        {!modify && (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => onClickHandler(e)}
          >
            {"저장"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default React.memo(TaskAdd);