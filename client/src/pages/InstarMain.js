import React, { useState, useEffect, useCallback } from "react";
import CardView from '../components/CardView';
import {firestore,sFirestore, storageService} from "../firebase";

const dataSet =(doc)=>{
    const json ={
        id:doc.id, 
        title:doc.data().title,
        image:doc.data().image, 
        imageName:doc.data().imageName,
        content: doc.data().content,
        cardContent: doc.data().cardContent,
        whose:doc.data().whose,
        timeCreated:doc.data().timeCreated,
    }
    return json;
}

const InstarMain = () =>{
    //변수
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        fetchData();
        }, [fetchData]);
    ///use Efect

    return (
        <div>
            <h2>
                여기는 인스타
            </h2>
            <div>
                {boards.map((board)=>(
                    <CardView data={board}/>
                ))}
            </div>
        </div>
    );
}

export default InstarMain;