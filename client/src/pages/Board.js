import React, { useState, useEffect, useCallback } from "react";
import BoardAdd from '../components/BoardAdd';
import BoardDisplay from '../components/BoardDisplay';
import {firestore,sFirestore,
    storageService
} from "../firebase";
const Board = () =>{
    const [board, setBoard] = useState({
        title:"",
        content:"",
        image:"",
        cardContent:"",
        FileInput:{},
    });
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [fillInput , setSeletedFile ] = useState(null);
    const [progress, setProgress] = useState(0);
    const [fillInput, setFillInput] = useState("");
    const [open, setOpen] = React.useState(false);

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

    const PostFirebase=(url)=>{
        if (board !== "") {
            firestore
            .collection("boards")
            .add({ 
                title:board.title,
                image:url, 
                content: board.content,
                cardContent: board.cardContent,
                whose:"YongSeok",
                timeCreated:sFirestore.Timestamp.fromDate(new Date())
             })
            .then((res) => {
                setBoard((prevTasks) => boards.concat({ 
                    id:res.id,
                    title:board.title,
                    image:url, 
                    content: board.content,
                    cardContent: board.cardContent,
                    whose:"YongSeok",
                 }));
            }).then((e)=>{
                alert("저장 완료");
                setOpen(false);
            });
            setBoard({
                title:"",
                content:"",
                image:"",
                cardContent:""
            });
        }
    }
    const boardAddClickHandler = (e) => {
        e.preventDefault();
        // console.log('in board selectedFile.name', fillinput.name);
        const uploadTask = storageService.ref(`images/${fillInput.name}`).put(fillInput);
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
              console.log(error);
            },
            () => {
                storageService
                    .ref("images")
                    .child(fillInput.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log('fire stroe 넣음 - url: ',url);
                        PostFirebase(url);
                    });
            }
          ); 

        

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
    const FileInputHandler= (e)=>{
        if(e.target.files[0]){
            console.log('in Boards ',e.target.files[0]);
            setFillInput(e.target.files[0]);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };
    const onChangeHandler = ({
        titleChangeHandler:titleChangeHandler,
        contentChangeHandler:contentChangeHandler,
        imageChangeHandler:imageChangeHandler,
        cardContentChangeHandler:cardContentChangeHandler,
        FileInputHandler:FileInputHandler,
        handleClickOpen:handleClickOpen,
        handleClose:handleClose
    });

    const removeHandler = (id) => {
        firestore
            .collection("boards")
            .doc(id)
            .delete()
            // .then(
            //     () =>
            //     setBoard((prevTasks) =>
            //         prevTasks.filter((prevTask) => prevTask.id !== id)
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
            {loading && <h1>Loading ...</h1>}
            {!loading && (
                <BoardDisplay
                boards={boards}
                removeHandler={removeHandler}
                modifyHandler={modifyHandler}
                />
            )}
            <BoardAdd
                board={boards}
                fillInput={fillInput}
                progress={progress}
                onChangeHandler={onChangeHandler}
                boardAddClickHandler={boardAddClickHandler}
                open={open}
            />
        </div>  
    );
}

export default Board;