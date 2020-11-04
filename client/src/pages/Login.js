import React,{useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {authService, uiConfig} from '../firebase';
import * as firebaseui from 'firebaseui';

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
    }
  }));

const Login =()=>{
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        var ui = new firebaseui.auth.AuthUI(authService);
        console.log('login to ui',ui);
        ui.start('#firebaseui-auth-container', uiConfig);
    }, [])

    const goLoginClick=()=>{
        try{
            Login({email, password})
        }catch(e){
            alert("Failed to login")
            setEmail("")
            setPassword("")
        }
    }
    const goSignUpClick=()=>{
        try{
            Login({email, password})
        }catch(e){
            alert("Failed to SignUp")
            setEmail("")
            setPassword("")
        }
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
                    <TextField id="input-with-icon-grid" label="Id" type="email"/>
                    </Grid>
                </Grid>
                <Grid item xs container spacing={1} direction="row" alignItems="center" justify="center" >
                    <Grid item>
                    <Lock/>
                    </Grid>
                    <Grid item>
                    <TextField id="input-with-icon-grid" label="Password" type="password"/>
                    </Grid>
                </Grid>
                <Grid className={classes.buttonFom} item xs container spacing={2} alignItems="center" justify="center" >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={goSignUpClick}
                        >
                            {"회원가입"}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={goLoginClick}
                        >
                            {"로그인"}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                        <div id="firebaseui-auth-container"></div>
                        <div id="loader">Loading...</div>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Login;