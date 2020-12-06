import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Bookmark from '@material-ui/icons/Bookmark';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
//
import Carousel from 'nuka-carousel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from '../firebase';
import {  useHistory } from 'react-router-dom';
//

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 614,
    margin:"auto",
    marginBottom:theme.spacing(3),
  },
  media: {
    height: 614,
    paddingTop: '1%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  rightSort:{
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
  commentFont:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color:'#87CEFA',
        fontWeight:"bold"
    },
    grid:{
        flexGrow: 1,
    },
    commnet:{
      columns:20
    }
}));

const boardDateForm =(d)=>{
    const now = new Date(d);
    const month = now.getMonth()+1;
    const year = now.getFullYear();
    const date = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();

    const form = `${year}-${month}-${date} ${hour}:${min}`;
    return form;
}

export default function CardView({auth,data,onChangeHandler,varCollection}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentInputField, setCommentInputField] = useState();
  const history = useHistory();
  const cardViewHandleClick = (event) => {
      setAnchorEl(event.currentTarget);//button 그거 값임
  };
  const cardViewHandleClose = () => {
      setAnchorEl(null);
  };

  const commentHandler=(e)=>{
    console.log('comment',e.target.value);
    setCommentInputField(e.target.value);
  }
  const addCommentButton=()=>{
    let jsonComment = data.comments?data.comments:[];
    jsonComment.push({user:auth.displayName,comment:commentInputField});
    firestore
    .collection("boards")
    .doc(data.id)
    .update({
      comments:jsonComment
    })
    .then((res)=>{
      history.push("/instarMain");
    })
  }
  const removeCommentButton=(index)=>{
    console.log(index);
    let task = data.comments;
    task.splice(index,1);
    // console.log('data.comments',task);
    firestore
    .collection("boards")
    .doc(data.id)
    .update({
      comment:task
    }).then(()=>{
      console.log('잘됨 ㅇㅇ');
      history.push();
    })
  }
  const checkUserGet=(index,auth,userName)=>{

    if(userName===auth.displayName){
      return(
        <IconButton size={"small"} className={classes.rightSort} onClick={()=>removeCommentButton(index)}>
          <Close/>
        </IconButton>   
        );  
      }else{
        return ""; 
      }
    }
  return (
        <Card className={classes.root} key={data}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                  {data.whose[0]}
              </Avatar>
            }
            action={
              data.whose===auth.displayName?
              <IconButton aria-label="settings" 
                onClick={(e)=>{
                  return cardViewHandleClick(e);
                }}
              >
                <MoreVertIcon />
              </IconButton>:""
            }
            title={data.title}
            subheader={boardDateForm(data.timeCreated.seconds*1000)}
          />
          <Carousel
          > 
            {
              data.image.map((image)=>{
                return(
                  <img src={image} alt={"img"} className={classes.media} key={image}/>
                );
              })
            }
          </Carousel>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {data.whose+" - "}
              {data.content}
            </Typography>
            <Divider/>
                    {data.comments?//댓글이 있을 시.
                      data.comments.map((comment,index)=>{
                        return (
                        <div key={comment.comment} className={classes.grid}>
                          <Grid container spacing={1}>
                            <Grid item xs={11}>
                              <Typography display="inline" variant="caption" color="textSecondary" component="p">  
                                <strong>{comment.user}</strong>
                                {" "}
                                {comment.comment}
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              {
                                checkUserGet(index,auth,comment.user)
                              } 
                            </Grid>
                          </Grid>
                        </div>
                      )})
                    :(//댓글 없을 시
                      <Typography display="inline" variant="caption" color="textSecondary" component="p">  
                          아직 댓글이 없어요...
                      </Typography>
                    )}
          </CardContent>
            
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton className={classes.rightSort}>
                <Bookmark/>
            </IconButton>
          </CardActions>
          <Divider/>
          <div className={classes.grid}>
            <Grid container  spacing={1}>
                <Grid item xs={10}>
                    <InputBase 
                        multiline
                        rowsMax={2}
                        fullWidth
                        placeholder="댓글 달기..." 
                        inputProps={{ 'aria-label': 'naked' }} 
                        className={classes.commentFont}
                        onChange={commentHandler}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button className={classes.paper} onClick={addCommentButton} >
                        게시
                    </Button>
                </Grid>
            </Grid>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={cardViewHandleClose}
          >
            <MenuItem onClick={(e)=>{
              return onChangeHandler.goUpdateHandle(data.id,e);
            }}>
              수정
            </MenuItem>
            <MenuItem onClick={()=>{
              return onChangeHandler.goDeleteHandle(data.id,data.imageName);
            }}>
              삭제
            </MenuItem>
          </Menu>
        </Card>
  );
}
