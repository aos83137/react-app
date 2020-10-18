import React,{useState,useEffect} from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    width: '100%',
    marginTop: 3,
    overflowX: "auto",
  },
  table:{
    minWidth: 1080
  },
  
});

function App() {
  const classes = useStyles();
  const [customers, setcustomers] = useState();

  useEffect(() => {
    callApi()
      .then(res=>{
        // console.log('res : ',res);
        setcustomers(res)}
      )
      .catch(err=>console.log(err));
    return () => {
      callApi();
    }
  }, [])

  const callApi = async()=>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  return (
    <Paper className={classes.root}>
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
            {/* {customers?customers.map(
              t=>{
                console.log(t.name, t.id);
              }
            ):''} */}
            {
              customers?
              customers.map( 
                d=><Customer key={d.id} customers={d}></Customer>)
              :''
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default App;
