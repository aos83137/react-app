import React, { useState, useEffect, useCallback } from "react";
import TaskAdd from '../components/TaskAdd';
import TaskDisplay from '../components/TaskDisplay';

import {firestore} from "../firebase";

const Board = () =>{
    // const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [boards, setBoards] = useState([]);

    const [modify, setModify] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        // let tasksData = [];
        let boardData = [];

        setLoading(true);
        // firestore
        //   .collection("tasks")
        //   .get()
        //   .then((docs) => {
        //     docs.forEach((doc) => {
        //       console.log('doc',doc.data(), doc.id);
        //       tasksData.push({ todo: doc.data().todo, id: doc.id });
        //     });
        //     setTasks((prevTasks) => prevTasks.concat(tasksData));
        //   });

        firestore
          .collection("boards")
          .get()
          .then((docs) => {
                docs.forEach((doc) =>{
                    console.log('boards doc', doc.data());
                    boardData.push({
                        id:doc.id, 
                        title:doc.data().title, 
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
        e.preventDefault();
        // if (task !== "") {
        //     firestore
        //     .collection("tasks")
        //     .add({ todo: task })
        //     .then((res) => {
        //         console.log(res);
        //         setTasks((prevTasks) => tasks.concat({ todo: task, id: res.id }));
        //     });
        //     setTask("");
        // }
    };


    const onChangeHandler = (e) => {
        // setTask(e.target.value);
    };

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
            <TaskAdd
                task={task}
                onClickHandler={onClickHandler}
                onChangeHandler={onChangeHandler}
                modify={modify}
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