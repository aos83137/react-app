import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useBtnStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "40%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const useCardStyles = makeStyles({
  root: {
    width: "280px",
    "&+&": {
      marginTop: "10px",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TaskDisplay = ({ tasks, removeHandler, modifyHandler }) => {
  const btnClasses = useBtnStyles();
  const cardClasses = useCardStyles();
  return (
    <>
      {tasks.map((task) => (
        <Card className={cardClasses.root} key={task.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {task.todo}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={btnClasses.root}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {
                    removeHandler(task.id);
                  }}
                >
                  삭제
                </Button>
                <Button onClick={modifyHandler(task.id)}>수정</Button>
              </ButtonGroup>
            </div>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
export default React.memo(TaskDisplay);