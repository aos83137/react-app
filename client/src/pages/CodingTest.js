import React,{useState,useEffect} from 'react';
const CodingTest =()=>{
    const board=	[[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    const moves=[1, 2, 3, 4, 5, 6, 1, 2];
    let result=0;

    const solution = (board, moves) => {
      const stack = [];
      const changeBoard = zip(...board);
      console.log('changeBoard',changeBoard);
      let cnt = 0;
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i] - 1;
        while (1) {
          const doll = changeBoard[move].shift();
          if (doll == undefined) break;
          if (doll > 0) {
            if (stack.length > 0 && stack[stack.length - 1] == doll) {
              stack.pop();
              cnt += 2;
            } else stack.push(doll);
            break;
          }
        }
      }
      return cnt;
    };
    
    const zip = (arr, ...arrs) => {
      return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
    };
    console.log(solution(board,moves));
    return (
        <div>
            <h2>coding test</h2>
        
        </div>
    );
}

export default CodingTest;