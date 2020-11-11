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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const TaskDisplay = ({ boards, removeHandler, modifyHandler, panel }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (panel,isExpanded) => {
    console.log('isExpanded:',isExpanded);
    setExpanded(isExpanded ? panel : false);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      {/* {boards.map((board) => (
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
            onClick={handleExpandClick(panel)}
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
        ))} */}

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default React.memo(TaskDisplay);