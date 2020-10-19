import React,{useState,useEffect} from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme)=>({
  root:{
    width: '100%',
    marginTop: 3,
    overflowX: "auto",
  },
  table:{
    minWidth: 1080
  },
  progress:{
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }
}));
 
function App() {
  const classes = useStyles();
  const [customers, setCustomers] = useState();
  useEffect(() => {
    callApi()
      .then(res=>{setCustomers(res)})
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
            {
              customers?
              customers.map( 
                d=><Customer key={d.id} customers={d}></Customer>)
              :
              <TableRow >
                <TableCell colSpan="6" align="center">
                <div className={classes.progress}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default App;
