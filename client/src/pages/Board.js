import React, { useState, useEffect, useCallback } from "react";
import TaskAdd from '../components/TaskAdd';
import TaskDisplay from '../components/TaskDisplay';
import BoardAdd from '../components/BoardAdd';
import {firestore} from "../firebase";
import Grid from "@material-ui/core/Grid";
const Board = () =>{
    // const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [board, setBoard] = useState({
        title:"",
        content:"",
        image:"",
        cardContent:"",
    });
    const [boards, setBoards] = useState([]);

    const [modify, setModify] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        // let tasksData = [];
        let boardData = [];
        setLoading(true);
        firestore
          .collection("boards")
          .get()
          .then((docs) => {
                docs.forEach((doc) =>{
                    boardData.push({
                        id:doc.id, 
                        title:doc.data().title,
                        image:doc.data().image, 
                        content: doc.data().content,
                        cardContent: doc.data().cardContent,
                        whose:doc.data().whose,
                    });
                })
                setBoards(boardData);
                setLoading(false);
          })
      }, []);
    useEffect(() => {
        fetchData();
        }, [fetchData]);

    const onClickHandler = (e) => {
        // e.preventDefault();
        console.log('board',board);
        if (board !== "") {
            firestore
            .collection("boards")
            .add({ 
                title:board.title,
                image:board.image, 
                content: board.content,
                cardContent: board.cardContent,
                whose:"YongSeok",
             })
            .then((res) => {
                console.log(res);
                setBoard((prevTasks) => boards.concat({ 
                    id:res.id,
                    title:board.title,
                    image:board.image, 
                    content: board.content,
                    cardContent: board.cardContent,
                    whose:"YongSeok",
                 }));
            });
            setBoard({
                title:"",
                content:"",
                image:"",
                cardContent:""
            });
        }
    };


    const titleChangeHandler = (e) => {
        console.log('title',e.target.value);
        setBoard({...board, title:e.target.value});
    };
    const contentChangeHandler = (e) => {
        console.log('content',e.target.value);

        setBoard({...board,content:e.target.value});
    };
    const imageChangeHandler = (e) => {
        console.log('image',e.target.value);

        setBoard({...board,image:e.target.value});
    };
    const cardContentChangeHandler = (e) => {
        console.log('cardContent',e.target.value);

        setBoard({...board,cardContent:e.target.value});
    };

    const onChangeHandler = ({
        titleChangeHandler:titleChangeHandler,
        contentChangeHandler:contentChangeHandler,
        imageChangeHandler:imageChangeHandler,
        cardContentChangeHandler:cardContentChangeHandler,
    });

    const removeHandler = (id) => {
        // firestore
        //     .collection("tasks")
        //     .doc(id)
        //     .delete()
        //     .then(() =>
        //     setTasks((prevTasks) =>
        //         prevTasks.filter((prevTask) => id !== prevTask.id)
        //     )
        // );
    };

    const modifyHandler = (id) => {
        // return (e) => {
        //     setTask("");
        //     setModify(true);
        //     e.target.innerText = modify ? "수정" : "완료";
        //     if (task !== "" && modify) {
        //     setTasks((prevTasks) =>
        //         tasks.map((taskOne) =>
        //         taskOne.id === id ? { ...taskOne, todo: task } : taskOne
        //         )
        //     );
        //     setTask("");
        //     setModify(false);
        //     }
        // };
    };
    return(
        <div>
            <h2>
                여기는 게시판
            </h2>
            <BoardAdd
                board={""} 
                onChangeHandler={onChangeHandler}
                onClickHandler={onClickHandler}
            />
            {loading && <h1>Loading ...</h1>}
            {!loading && (
                <TaskDisplay
                boards={boards}
                removeHandler={removeHandler}
                modifyHandler={modifyHandler}
                />
            )}
        </div>  
    );
}

export default Board;