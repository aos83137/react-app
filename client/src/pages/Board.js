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
    const [progress, setProgress] = useState(0);
    const [fillInput, setFillInput] = useState("");
    const [open, setOpen] = React.useState(false);
    const [togle, setTogle] = useState(false);

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
                        imageName:doc.data().imageName,
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
                imageName:fillInput.name,
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
                    imageName:fillInput.name,
                    content: board.content,
                    cardContent: board.cardContent,
                    whose:"YongSeok",
                 }));
            }).then((e)=>{
                alert("저장 완료");
                setTogle(false);
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
        setTogle(true);
        setFillInput("");
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

    const removeHandler = (id,imageName) => {
        console.log('this removeHandler - imageName:', imageName);
        console.log('this removeHandler - imageName:', imageName);
        const desertRef = storageService.ref(`images/${imageName}`);
        desertRef.delete().then(()=>{
            // File deleted successfully
            firestore
            .collection("boards")
            .doc(id)
            .delete()
            .then(()=>{
                alert("삭제 성공");
            });
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log('삭제 에러',error);
            switch (error.code) {
                case "storage/object-not-found":
                    firestore
                    .collection("boards")
                    .doc(id)
                    .delete()
                    .then(()=>{
                        alert("삭제 성공");
                    })
                    break;
                default:
                    break;
            }
        });


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
                togle={togle}
            />
        </div>  
    );
}

export default Board;