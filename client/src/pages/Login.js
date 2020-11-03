import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Lock from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    mainContainer:{
        flexGrow: 1,
        margin:theme.spacing(20),
        padding:theme.spacing(10),
        backgroundColor:"white",
        minWidth:"580px"
    },
    gridStyle:{
        fontSize:"24px",
        marginBottom:"15spx",
    },
    buttonFom:{
        marginTop:theme.spacing(1),
    },
    grid:{
        width:'800px',
        // backgroundColor:'red',
    }
  }));

const Login =()=>{
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleClick=()=>{
        try{
            Login({email, password})
        }catch(e){
            alert("Failed to login")
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
                    <TextField id="input-with-icon-grid" label="Id" />
                    </Grid>
                </Grid>
                <Grid item xs container spacing={1} direction="row" alignItems="center" justify="center" >
                    <Grid item>
                    <Lock/>
                    </Grid>
                    <Grid item>
                    <TextField id="input-with-icon-grid" label="Password" />
                    </Grid>
                </Grid>
                <Grid className={classes.buttonFom} item xs container spacing={2} alignItems="center" justify="center" >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={}
                        >
                            {"회원가입"}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={}
                        >
                            {"로그인"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Login;