import React,{useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { requirePropFactory, Typography } from '@material-ui/core';
import {authService, googleSign} from '../firebase';
import {  
    useHistory
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    mainContainer:{
        flexGrow: 1,
        margin:"auto",
        marginTop:theme.spacing(20),
        padding:theme.spacing(10),
        backgroundColor:"white",
        minWidth:"580px",
        maxWidth:"800px",
    },
    gridStyle:{
        fontSize:"24px",
        marginBottom:"15spx",
    },
    buttonFom:{
        marginTop:theme.spacing(1),
    },
    grid:{
        // backgroundColor:'red',
    },
    googleButton:{
        backgroundColor:'white',
        color:'black',
    }
  }));

const Login =()=>{

    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {


    }, [])
    let history = useHistory();

    function goLoginClick(email,password) {
      authService.signInWithEmailAndPassword(email, password)
      .then((res)=>{
          alert("로그인 성공");
          history.push("/");
      })
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
          } else {
              alert(errorMessage);
          }
          console.log('goLoginClick function - error',error);
          // [END_EXCLUDE]
      });
    }
    const goTest=()=>{
        alert("etest");
    }
    const goSignUpClick=(email,password)=>{
        authService.createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
    }

    const emailHandler =(data)=>{
        setEmail(data.target.value);
    }
    const passwordHandler=(data)=>{
        setPassword(data.target.value);
    }
    return (
        <Card className={classes.mainContainer}>
            <Grid className={classes.grid} container spacing={3} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.gridStyle}>
                        로그인
                    </Typography>
                </Grid>
                <Grid item xs container spacing={1} direction="row" alignItems="center" justify="center"  >
                    <Grid item >
                    <AccountCircle />
                    </Grid>
                    <Grid item >
                    <TextField id="input-with-icon-grid" label="Id" type="email" onChange={emailHandler}/>
                    </Grid>
                </Grid>
                <Grid item xs container spacing={1} direction="row" alignItems="center" justify="center" >
                    <Grid item>
                    <Lock/>
                    </Grid>
                    <Grid item>
                    <TextField id="input-with-icon-grid" label="Password" type="password" onChange={passwordHandler}/>
                    </Grid>
                </Grid>
                <Grid className={classes.buttonFom} item xs container spacing={2} alignItems="center" justify="center" >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e)=>goSignUpClick(email,password)}
                        >
                            {"회원가입"}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e)=>{
                                return goLoginClick(email,password)
                            }}
                        >
                            {"로그인"}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e)=>{
                            history.push("/");
                            return googleSign()
                        }}
                        // className={classes.googleButton}
                    >
                        <img src={require('../static/images/google.jpg')}/>
                        {"구글로그인입니당"}
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Login;