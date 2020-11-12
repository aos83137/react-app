import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

  const boardDateForm =(d)=>{

    const now = new Date(d);

    const month = now.getMonth()+1;
    const year = now.getFullYear();
    const date = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();

    const form = `${year}-${month}-${date} ${hour}:${min}`;
    return form;
  }
  return (
    <div className={classes.root}>
      {boards.map((board) => (
          <Accordion expanded={expanded === board.id} onChange={handleChange(board.id)} key={board.id} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {board.title}
              </Typography>
              <Typography className={classes.heading}>{board.whose}</Typography>
            <Typography className={classes.secondaryHeading}>{boardDateForm(board.timeCreated.seconds*1000)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {board.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
      ))}
    </div>
  );
};
export default React.memo(TaskDisplay);