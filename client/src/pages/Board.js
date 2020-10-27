import React from 'react';
import TaskAdd from '../components/TaskAdd';

const Board = () =>{
    return(
        <div>
            <h2>
                여기는 게시판
                <TaskAdd/>
            </h2>
        </div>
    );
}

export default Board;