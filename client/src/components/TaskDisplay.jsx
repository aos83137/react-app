import React from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardHeader, CardMedia, CardContent,CardActions,
  Collapse,Avatar,IconButton,Typography} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) =>({
  root:{
    minWidth:"580px",
    maxWidth:"1080px",
    margin:"auto",
    marginBottom:theme.spacing(3),
  },
  media:{
    height:0,
    paddingTop: '56.25%', //16:9
  },
  expend:{
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform',{
      duration: theme.transitions.duration.shortest,
    }),
  },
  expanOpen:{
    transform: 'rotate(180deg)',
  },
  avatar:{
    backgroundColor:red[500],
  }
}));

const TaskDisplay = ({ boards, removeHandler, modifyHandler }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {boards.map((board) => (
        <Card className={classes.root} key={board.id}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {board.whose[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={board.title}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={board.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {board.cardContent}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {board.content}
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
              medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
              again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
          </CardContent>
        </Collapse>
        </Card>
        ))}
    </>
  );
};
export default React.memo(TaskDisplay);