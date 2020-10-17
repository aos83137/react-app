import React from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const customers = [
  {
    'id': 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name': '전용석',
    'birthday' : '951211',
    'gender':'남자',
    'job': '엔지니어'
  },
  {
    'id': 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name': '유메농',
    'birthday' : '950328',
    'gender':'여자',
    'job': '학생'
  },
  {
    'id': 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name': '코지마',
    'birthday' : '950222',
    'gender':'여자',
    'job': '백수'
  }

];

const useStyles = makeStyles({
  root:{
    width: '100%',
    marginTop: 3,
    overflowX: "auto",
  },
  table:{
    minWidth: 1080
  }
});

function App() {
  const classes = useStyles();
  
  return (
    <Paper className={classes.root}>
      <p>Component</p>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell align="right">이미지</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">생년월일</TableCell>
              <TableCell align="right">성별</TableCell>
              <TableCell align="right">직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers.map( 
                (text, index)=>
                    <Customer key={text.id} customers={text}></Customer>            
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default App;
