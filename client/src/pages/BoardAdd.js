import React, { useState, useEffect, useCallback } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
import {DropzoneArea} from 'material-ui-dropzone'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {  useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

//firebase
import {firestore,sFirestore, storageService,authService} from "../firebase";
//firebase 

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
            image:[], 
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
    const [progress, setProgress] = useState(0);
    const [cnt, setCnt] = useState(0);
    let history = useHistory();
    let now=new Date();

    // const [auth, setAuth] = useState(false);//안필요할거같은데?..

    //변수

    ///use Efect

    const authData = useCallback(()=>{
        authService.onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              setBoard({...board, whose:user.displayName});
            //   setAuth(user);//안필요할거같은데?,..
            } else {
              // User is signed out.
              // ...
            }
        });
    })

    useEffect(() => {
        authData();
        }, [authData]);
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
        setCnt(e.length);
        setBoard({...board,imageName:e});
    };
    const addButtonClickEvent=async(e)=>{
        let start = 0;
        console.log('board',board);
        e.preventDefault();
        let imageSet=[];
        let nameSet =[];
        let flag=false;
        if(board.imageName){
            await board.imageName.map((file)=>{
                console.log('imageName:',file);
                let imageName = file.name.split('.')[0]+"_"+now.getTime()+"."+file.name.split('.')[1];
                console.log(imageName);
                //////////
                const uploadTask = storageService.ref(`images/${imageName}`).put(file);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log('progress -',progress); // 잘되고
                    setProgress(progress);
                    },
                    error => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        
                            case 'storage/canceled':
                            // User canceled the upload
                            break;
                                    
                            case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
        
                            default:
                            break;
                        }
                    },
                    () => {
                        storageService
                            .ref("images")
                            .child(imageName)
                            .getDownloadURL()
                            .then(url => {
                                console.log('fire stroe 넣음 - url: ',url);
                                imageSet.push(url);
                                nameSet.push(imageName);
                                //이값을 리얼타임에 넣고 가져온다.
                                console.log('imageSet',imageSet);
                                console.log('cnt-',cnt,'start-',start);
                                if(cnt>start+1){
                                    start++;
                                }else{
                                    flag = true;
                                    console.log('flag',flag);
                                }
                            })
                    }
                );
                ///////////////////
            });
            setTimeout(()=>{//이게 임시방편인데 리얼타임 이용하면 해결될듯
                if(flag){
                    console.log('imageSet',board);
                    console.log('imageSet',imageSet);
                    console.log('nameSet',nameSet);
                    if(board !== ""){
                        firestore
                        .collection("boards")
                        .add({
                            title:board.title,
                            image:imageSet,
                            imageName:nameSet,
                            content: board.content,
                            whose:board.whose,
                            timeCreated:sFirestore.Timestamp.fromDate(new Date())
                        })
                        .then((res)=>{
                            console.log('잘되나ㅣ');
                            alert('저장 완료');
                            history.push('/instarMain');
                        }).catch((e)=>{
                            console.log('e',e);
                        })
                    }
                }else{
                    setTimeout(()=>{
                        if(flag){
                            console.log('imageSet',imageSet);
                        }else{
                            console.log("너무 느려서 안되네요 미안해요 ㅎㅎ;");
                        }
                    })
                }
            },3000*cnt);               
        }
    }
    //addBUttonCLickEvnet End

    //function
    return (
        <div>
            <h2>게시판 등록</h2>
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
            <LinearProgressWithLabel value={progress} />
            <Button onClick={addButtonClickEvent} endIcon={<AddIcon/>}>
                게시글 등록
            </Button>
        </div>
    );
}

export default BoardAdd;