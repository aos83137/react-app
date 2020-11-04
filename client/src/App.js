import React, { useState, useEffect, useCallback } from "react";
import { TaskAdd, TaskDisplay } from "./components";

import { firestore } from "./firebase";

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [modify, setModify] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    let tasksData = [];
    setLoading(true);
    firestore
      .collection("tasks")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          console.log('doc',doc.data(), doc.id);
          tasksData.push({ todo: doc.data().todo, id: doc.id });
        });
        setTasks((prevTasks) => prevTasks.concat(tasksData));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onClickHandler = (e) => {
    e.preventDefault();
    if (task !== "") {
      firestore
        .collection("tasks")
        .add({ todo: task })
        .then((res) => {
          console.log(res);
          setTasks((prevTasks) => tasks.concat({ todo: task, id: res.id }));
        });
      setTask("");
    }
  };

  const onChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const removeHandler = (id) => {
    firestore
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() =>
        setTasks((prevTasks) =>
          prevTasks.filter((prevTask) => id !== prevTask.id)
        )
      );
  };

  const modifyHandler = (id) => {
    return (e) => {
      setTask("");
      setModify(true);
      e.target.innerText = modify ? "수정" : "완료";
      if (task !== "" && modify) {
        setTasks((prevTasks) =>
          tasks.map((taskOne) =>
            taskOne.id === id ? { ...taskOne, todo: task } : taskOne
          )
        );
        setTask("");
        setModify(false);
      }
    };
  };

  return (
    <div className="App">
      <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
      <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
      <TaskAdd
        task={task}
        onClickHandler={onClickHandler}
        onChangeHandler={onChangeHandler}
        modify={modify}
      />
      {loading && <h1>Loading ...</h1>}
      {!loading && (
        <TaskDisplay
          tasks={tasks}
          removeHandler={removeHandler}
          modifyHandler={modifyHandler}
        />
      )}
    </div>
  );
}

export default React.memo(App);
