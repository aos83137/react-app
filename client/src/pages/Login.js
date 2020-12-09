import React,{useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
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

    const goSignUpClick=(email,password)=>{
        authService.createUserWithEmailAndPassword(email, password)
        .then((res)=>{
            //일단 여기는 email, password를 기반으로 회원가입이 완료됨
            //하지만 displayName이라던가 세부사항은 못넣어서
            //res.user.updateProfile을 이용해서 displayName등을 저장해줄 거임.
            //게시판 부분좀 만들고 이부분 회원가입 페이지 다시좀 만들어 보자구
            res.user.updateProfile({
                displayName:"NoName"+Math.floor(Math.random()*1000),
                photoURL:"https://example.com/jane-q-user/profile.jpg"
            }).then(function() {
            // Update successful.
            //
                console.log('in Login res:',res.user.email);
                console.log('in Login res.user.displayName:',res.user.displayName);
                alert("회원가입 성공")
                history.push("/");
            }).catch(function(error) {
            // An error happened.
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/weak-password') {
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
                            onClick={(e)=>{
                                return goSignUpClick(email,password)
                            }}
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
                            return googleSign()
                            .then(()=>{
                                history.push("/");
                                console.log("success google login");
                            });
                        }}
                        // className={classes.googleButton}
                    >
                        <img style={{ height:20,marginRight:10}}src={require('../static/images/google.png')} alt="google login"/>

                        {"구글로그인"}
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Login;