import React, { useState, useEffect, useCallback } from "react";
import BoardAdd from '../components/BoardAdd';
import BoardDisplay from '../components/BoardDisplay';
import {firestore,sFirestore,
    storageService
} from "../firebase";
const Board = () =>{
    // const [tasks, setTasks] = useState([]);
    const [board, setBoard] = useState({
        title:"",
        content:"",
        image:"",
        cardContent:"",
    });
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);


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
                    boardData.push({
                        id:doc.id, 
                        title:doc.data().title,
                        image:doc.data().image, 
                        content: doc.data().content,
                        cardContent: doc.data().cardContent,
                        whose:doc.data().whose,
                        timeCreated:doc.data().timeCreated,
                    });
                })
                setBoards(boardData);
                setLoading(false);
          })
      }, []);
    useEffect(() => {
        fetchData();
        }, [fetchData]);

    const onClickHandler = (e, seletedFile) => {
        e.preventDefault();
        console.log('in board selectedFile.name', seletedFile);
        const uploadTask = storageService.ref(`images/${seletedFile.name}`).put(seletedFile);
        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            () => {
                storageService
                    .ref("images")
                    .child(seletedFile.name)
                    .getDownloadURL()
                    .then(url => {
                    setUrl(url);
                    });
            }
          );

        if (board !== "") {
            firestore
            .collection("boards")
            .add({ 
                title:board.title,
                image:board.image, 
                content: board.content,
                cardContent: board.cardContent,
                whose:"YongSeok",
                timeCreated:sFirestore.Timestamp.fromDate(new Date())
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
            }).then((e)=>{
                console.log(e);
                alert("저장 완료");
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
                <BoardDisplay
                boards={boards}
                removeHandler={removeHandler}
                modifyHandler={modifyHandler}
                />
            )}
        </div>  
    );
}

export default Board;