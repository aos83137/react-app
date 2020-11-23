import React, { useState, useEffect, useCallback } from "react";
import CardView from '../components/CardView';
import Add from '../components/Add';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
import {DropzoneArea} from 'material-ui-dropzone'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

//firebase
import {firestore,sFirestore, storageService,authService} from "../firebase";
//firebase 

const dataSet =(doc)=>{
    let json={};
    if(doc!=""){
        json ={
            id:doc.id, 
            title:doc.data().title,
            image:doc.data().image, 
            imageName:doc.data().imageName,
            content: doc.data().content,
            whose:doc.data().whose,
            timeCreated:doc.data().timeCreated,
        }
    }else(
        json ={
            title:"",
            image:"", 
            imageName:"",
            content: "",
            whose:"",
        }
    )
    
    return json;
}

const BoardAdd = () =>{
    //변수
    const [board, setBoard] = useState(dataSet(""));
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [openAddDialog, setOpen] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [togle, setTogle] = useState(false);
    const [files, setFiles] = useState([]);

    // const [auth, setAuth] = useState(false);//안필요할거같은데?..

    //변수

    ///use Efect
    const fetchData = useCallback(() => {
        // let tasksData = [];
        let boardData = [];
        setLoading(true);
        firestore
            .collection("boards")
            .orderBy("timeCreated", "desc")
            .get()
            .then((docs) => {
                docs.forEach((doc) =>{
                    boardData.push(dataSet(doc));
                })
                setBoards(boardData);
                setLoading(false);
          })
      }, []);
    const authData = useCallback(()=>{
        authService.onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('user info',user);
              setBoard({...board, whose:user.displayName});
            //   setAuth(user);//안필요할거같은데?,..
            } else {
              // User is signed out.
              // ...
            }
        });
    })

    useEffect(() => {
        fetchData();
        authData();
        }, [fetchData]);
    ///use Efect


    //function
    const titleChangeHandler = (e) => {
        console.log('title',e.target.value);
        setBoard({...board, title:e.target.value});
    };
    const contentChangeHandler = (e) => {
        console.log('content',e.target.value);

        setBoard({...board,content:e.target.value});
    };
    const imageChangeHandler = (e) => {
        // console.log('image',e.target.value);
        console.log('e',e);
        setBoard({...board,imageName:e});
    };
    const addButtonClickEvent=(e)=>{
        console.log('board',board);
    }
    //function
    return (
        <div>
            <TextField
                  autoFocus
                  id="standard-basic"
                  label="title"
                  fullWidth
                  onChange={titleChangeHandler}
                  margin="dense"
            />
            <TextField
                  id="outlined-multiline-static"
                  label="content"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  onChange={contentChangeHandler}
                  margin="dense"
            />
            <DropzoneArea
                onChange={imageChangeHandler.bind(this)}
            />
            <Button onClick={addButtonClickEvent}>
                +
            </Button>
        </div>
    );
}

export default BoardAdd;