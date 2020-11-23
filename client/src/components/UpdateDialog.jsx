import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Create from '@material-ui/icons/Create';
import Close from '@material-ui/icons/Close';

import {storageService, firestore} from '../firebase';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function UpdateDialog({data,onChangeHandler, modifyHandler,fieldData,fillInput,progress,togle,openUpdateDialog}) {
  const board = data;
  // const onChangeHandler = data.onChangeHandler;
  // const modifyHandler=data.modifyHandler;
  // const fieldData = data.fieldData;
  // const fillInput = data.fillInput;

  const deleteImage=(data)=>{
    console.log('click deleteImage');
    const desertRef = storageService.ref(`images/${data.imageName}`);
    desertRef.delete().then(()=>{
      firestore
      .collection("boards")
      .doc(data.id)
      .update({ 
            image:"",
            imageName:"",
        })
        .then((res)=>{
            alert("사진 삭제 완료")
        })
        .catch((error)=>{
            console.log('수정 error',error);
        })
  }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log('삭제 에러',error);
      switch (error.code) {
          case "storage/object-not-found":
            console.log('객체가 없음');
              break;
          default:
            console.log(error.code);
              break;
      }
  });
  }
  return (
    <>
      <Button startIcon={<Create/>} variant="outlined" color="primary" onClick={onChangeHandler.updateDialoghandleClickOpen}>
        수정
      </Button>
      <Dialog open={openUpdateDialog} onClose={onChangeHandler.updateDialogHandleClose} aria-labelledby="form-dialog-title" key={"ltet"}>
        <DialogTitle id="form-dialog-title">글 수정</DialogTitle>
        <DialogContent>

            <TextField
                label="title"
                fullWidth
                margin="dense"
                defaultValue={board.title}
                onChange={onChangeHandler.titleChangeHandler}
            />
            <TextField
                label="content"
                multiline
                rows={6}
                // variant="outlined"
                fullWidth
                margin="dense"
                defaultValue={board.content}
                onChange={onChangeHandler.contentChangeHandler}
            />
            <TextField
                label="cardContent"
                fullWidth
                margin="dense"
                defaultValue={board.cardContent}
                onChange={onChangeHandler.cardContentChangeHandler}
            />
            {
              console.log('board',board)
            }
            { 
              board.image?
              <div>
                  <Button startIcon={<Close/>} onClick={(e)=>deleteImage(board)}>
                    {board.imageName}
                  </Button>
              </div>
              :""
            }
            <input
                accept="image/*"
                // className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e)=>{
                  return onChangeHandler.FileInputHandler(e);
                }}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" color="default" startIcon={<CloudUploadIcon />} component="span" >
                    사진 등록
                </Button>
            </label> 
            {fillInput?
                  <p>{fillInput.name}</p>
                  :
                  <p>{"파일 선택 하지 않음"}</p>
              }
              {
                togle?
                <LinearProgressWithLabel value={progress} />
                :""
              }
        </DialogContent>
        <DialogActions>
          <Button onClick={onChangeHandler.updateDialogHandleClose} color="primary">
            취소
          </Button>
          <Button onClick={
                            (e)=>{
                              console.log('수정 시작');
                              console.log('id,',board.id);
                              console.log('id,',fieldData);
                            return modifyHandler(board.id, fieldData)}
                          } 
                          color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default React.memo(UpdateDialog);