import React, { useState, useEffect, useCallback } from "react";
import CardView from '../components/CardView';
import {firestore,sFirestore, storageService} from "../firebase";
import Add from '../components/Add';
import {  useHistory } from 'react-router-dom';

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

const InstarMain = () =>{
    //변수
    const [board, setBoard] = useState(dataSet(""));
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const varCollection = {
        anchorEl:anchorEl,
    }
    let history = useHistory();
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
          .catch((e)=>{
              console.log('데이터 없나봐요',e);
              setLoading(true);
          });
      }, []);
    useEffect(() => {
        fetchData();
        }, [fetchData]);
    ///use Efect


    //function
    const goUpdateHandle=()=>{
        console.log('goUpdateHandle');
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
        })
        firestore
        .collection("boards")
        .doc(id)
        .delete()
        .then(()=>{
            alert("삭제 했습니다.");
            history.push("/instarMain")
        })
    }
    const cardViewHandleClick = (event) => {
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
        <div>
            <h2>
                여기는 인스타
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
                            <CardView data={board} key={board.id} onChangeHandler={onChangeHandler} varCollection={varCollection}/>
                        ))}
                    </div>
                    <Add/>
                </>
            }
            
        </div>
    );
}

export default InstarMain;