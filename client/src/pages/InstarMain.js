import React, { useState, useEffect, useCallback } from "react";
import CardView from '../components/CardView';
import {firestore,authService, storageService} from "../firebase";
import Add from '../components/Add';
import {  useHistory,useRouteMatch } from 'react-router-dom';

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
            comments:doc.data().comments,
        }
    }else(
        json ={
            title:"",
            image:"", 
            imageName:"",
            content: "",
            whose:"",
            comments:"",
        }
    )
    
    return json;
}

const InstarMain = () =>{
    //변수
    const [auth, setAuth] = useState();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const varCollection = {
        anchorEl:anchorEl,
    }
    let history = useHistory();
    let {path} = useRouteMatch();
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
            .catch((er)=>{
                console.log('error 데이터 없엉',er);
            })

      }, []);
    const authData = useCallback(()=>{
        authService.onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('user info',user.photoURL);
              setAuth(user);
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
    const goUpdateHandle=(dataId,e)=>{
        console.log('goUpdateHandle',e);
        history.push(`${path}/update/${dataId}`);
    }
    const goDeleteHandle=(id,imageName)=>{
        console.log('delete handler');
        console.log('this removeHandler - imageName:', imageName);
        imageName.map((data)=>{
            const deserRef = storageService.ref(`images/${data}`);
            deserRef.delete().then((d)=>{
                console.log('삭제 성공',d);
            })
            .catch((error)=>{
                // Uh-oh, an error occurred!
                console.log('삭제 에러',error);
                switch (error.code) {
                    case "storage/object-not-found":
                        console.log('storage/object-not-found');
                        break;
                    default:
                        break;
                }
            })
            return "";
        })
        firestore
        .collection("boards")
        .doc(id)
        .delete()
        .then(()=>{
            alert("삭제 했습니다.");
            history.go(0);
        })
    }
    const cardViewHandleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const cardViewHandleClose = () => {
        setAnchorEl(null);
    };

    const onChangeHandler = ({
        // titleChangeHandler:titleChangeHandler,
        goUpdateHandle:goUpdateHandle,
        goDeleteHandle:goDeleteHandle,
        cardViewHandleClick:cardViewHandleClick,
        cardViewHandleClose:cardViewHandleClose,
    });   
    //function
    return (
        <div className="instarMain">
            <h2>
                글 등록
            </h2>
            {
                loading?
                <div>
                    <h2>Loading...</h2>
                </div>    
                :
                <>
                    <div>
                        {boards.map((board)=>(
                            <CardView auth={auth} data={board} key={board.id} onChangeHandler={onChangeHandler} varCollection={varCollection}/>
                        ))}
                    </div>
                    <Add/>
                </>
            }
            
        </div>
    );
}

export default InstarMain;