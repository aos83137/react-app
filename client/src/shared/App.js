import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import {authService} from '../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {  
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useHistory
} from 'react-router-dom';
import {Home,Login,Board} from '../pages';

// import { firestore } from "../firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  linkType:{
    textDecoration:'none',
    color: "#000000",
  },
  linkColor:{
    textDecoration:'none',
    color: "#FFFFFF",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setAuth(user);
        // var displayName = user.displayName; // 구글 사용자 이름나옴
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL; // 구글 사진 url나옴
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // console.log('displayName',displayName);
        // console.log('email',email);
        // console.log('emailVerified',emailVerified);//이메일확인
        // console.log('photoURL',photoURL);
        // console.log('isAnonymous',isAnonymous); //익명인가
        // console.log('uid',uid);
        // console.log('providerData',providerData);
      } else {
        // User is signed out.
        // ...
      }
      setLoading(true);
    });
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let history = useHistory();


  const goLogout=()=>{
    authService.signOut().then(()=>{
      alert("로그아웃했어용");
      setAuth(false);
      history.push("/");
      window.location.reload(false);
    })
  }

  function goHome() {
    history.push("/");
  }
  const goBoard=()=>{
  }

  return (
    loading?
      <div className={classes.root}>
      <Router>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                  리엑트와 파이어베이스로 만드는 홈페이지
              </Typography>
              {
                auth?
                <>
                  <Link to="/" className={classes.linkColor}>
                    <IconButton
                          color="inherit"
                          aria-label="login"
                          edge="end"
                          onClick={goHome}
                      >
                        <Icon>home</Icon>
                    </IconButton>
                  </Link>
                  <IconButton
                      color="inherit"
                      aria-label="login"
                      edge="end"
                      onClick={goLogout}
                  >
                    <Icon>logout</Icon>
                  </IconButton>
                </>
                :
                <>
                  <Link to="/" className={classes.linkColor}>
                    <IconButton
                          color="inherit"
                          aria-label="login"
                          edge="end"
                          onClick={goHome}
                      >
                        <Icon>home</Icon>
                    </IconButton>
                  </Link>
                  <Link to="/login" className={classes.linkColor}>
                    <IconButton
                        color="inherit"
                        aria-label="login"
                        edge="end"
                    >
                        <Icon>login</Icon>
                    </IconButton>
                  </Link>
                </>
              }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
            {
              auth?
              <List>
                  <Link to="/" className={classes.linkType}>
                      <ListItem button key={"홈"} onClick={goHome}>
                          <ListItemIcon>
                              <Icon>home</Icon>
                          </ListItemIcon>
                          <ListItemText primary={"홈"} />
                      </ListItem>
                  </Link>
                  <Link to="/board" className={classes.linkType}>
                      <ListItem button key={"게시판"} onClick={goBoard}>
                          <ListItemIcon>
                              <Icon>list_alt</Icon>
                          </ListItemIcon>                
                          <ListItemText primary={"게시판"} />
                      </ListItem>
                  </Link>
              </List>
              :
              <List>
                  <Link to="/" className={classes.linkType}>
                      <ListItem button key={"홈"} onClick={goHome}>
                          <ListItemIcon>
                              <Icon>home</Icon>
                          </ListItemIcon>
                          <ListItemText primary={"홈"} />
                      </ListItem>
                  </Link>

              </List>
            }
          <Divider />

        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader} />
            <Switch>
                {
                    auth?
                    <React.Fragment>
                      <Route exact path="/" render={auth=>(<Home/>)}/>
                      <Route path="/board" component={Board}/>
                      {/* <Redirect path="/login" to="/" /> */}
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <Route exact path="/" render={auth=>(<Home/>)}/>
                      <Route path="/login" render={props => (<Login/>)}/>
                      {/* <Redirect path="/board" to="/" /> */}
                    </React.Fragment>
                }
            </Switch>
        </main>
        </Router>

      </div>
    :
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        < CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}