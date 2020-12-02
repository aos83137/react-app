import React, { useState, useEffect, useCallback } from "react";


import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {  useHistory,useParams } from 'react-router-dom';
import Close from '@material-ui/icons/Close';

//firebase
import {firestore,authService} from "../firebase";
//firebase 

const dataSet =(doc)=>{
    let json={};
    if(doc!==""){
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

const BoarUpdate = () =>{
    //변수
    const [board, setBoard] = useState(dataSet(""));
    let history = useHistory();
    let {id} = useParams();
    //변수

    ///use Efect
    const fetchData = useCallback(() => {
        console.log("params id",id);
        firestore
            .collection("boards")
            .doc(id)
            .get()
            .then((doc) => {
                console.log(doc.data());
                setBoard(dataSet(doc));
          })
      }, [id]);

    const authData = useCallback(()=>{
        authService.onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('user info',user);
              setBoard({whose:user.displayName});
            //   setAuth(user);//안필요할거같은데?,..
            } else {
              // User is signed out.
              // ...
            }
        });
    },[])

    useEffect(() => {
        fetchData();
        authData();
        }, [fetchData,authData]);
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

    const modifyHandler=(id,data)=>{
        console.log('check id,data : ', id,data);
        if(data!==""){
            firestore
            .collection("boards")
            .doc(id)
            .update({
                title:data.title,
                content:data.content,
            })
            .then((res)=>{
                alert('수정 되었습니다.');
                history.goBack();
            })
            
        }
    }
    //function
    return (
        <div>
            <h2>게시판 수정 : {id}</h2>
            <TextField
                  autoFocus
                  id="standard-basic"
                  label="title"
                  value={board.title}
                  fullWidth
                  onChange={titleChangeHandler}
                  margin="dense"
            />
            <TextField
                  id="outlined-multiline-static"
                  label="content"
                  multiline
                  value={board.content}
                  rows={6}
                  variant="outlined"
                  fullWidth
                  onChange={contentChangeHandler}
                  margin="dense"
            />
            { 
              board.imageName?
              board.imageName.map((name)=>{
                return (
                    <div>
                        <Button startIcon={<Close/>} 
                        //   onClick={(e)=>deleteImage(board)}
                        >
                            {name}
                        </Button>
                    </div>
                );
              })
              
              :""
            }
            <Button onClick={()=>{
                return modifyHandler(board.id,board)
            }}>
                +
            </Button>
        </div>
    );
}

export default BoarUpdate;