import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {  useHistory } from 'react-router-dom';
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
    dialogStyle:{
      width:'1000px'
    }
  }));

  const Add =()=>{
    const classes = useStyles();
    let history = useHistory();
    const goAddBoard =()=>{
        history.push('/instarMain/create')
        return console.log('go Add Board success');
    }
    return(
        <div>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={goAddBoard}>
                <AddIcon />
            </Fab>
        </div>
    );
  }

  export default Add;