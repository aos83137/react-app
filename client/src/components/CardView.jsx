import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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

//
import Carousel from 'nuka-carousel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 614,
    margin:"auto",
    marginBottom:theme.spacing(3),
  },
  media: {
    height: 614,
    // paddingTop: '56.25%', // 16:9
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

export default function CardView({data,onChangeHandler,varCollection}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
              {data.whose[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={onChangeHandler.cardViewHandleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={boardDateForm(data.timeCreated.seconds*1000)}
      />
      <Carousel
      >
        <img src={data.image[0]} className={classes.media}/>
        <img src={data.image[1]} className={classes.media}/>
        <img src={data.image[2]} className={classes.media}/>
        <img src={data.image[3]} className={classes.media}/>
        <img src={data.image[4]} className={classes.media}/>
      </Carousel>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {data.whose+" - "}
          {data.content}
        </Typography>
        <Divider/>
        <Typography display="inline" variant="caption" color="textSecondary" component="p">  
                {"사용자 "}
                {"좋아 보이네~~"}
            </Typography>
            <IconButton size={"small"} className={classes.rightSort}>
                <FavoriteIcon/>
            </IconButton>   
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
                />
            </Grid>
            <Grid item xs>
                <Button className={classes.paper} >
                    게시
                </Button>
            </Grid>
        </Grid>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={varCollection.anchorEl}
        keepMounted
        open={Boolean(varCollection.anchorEl)}
        onClose={onChangeHandler.cardViewHandleClose}
      >
        <MenuItem onClick={onChangeHandler.goUpdateHandle}>수정</MenuItem>
        <MenuItem onClick={()=>{
          return onChangeHandler.goDeleteHandle(data.id,data.imageName)
        }}>
          삭제
        </MenuItem>
      </Menu>
    </Card>
  );
}
